from calendar import day_abbr
from urllib import response
from django.shortcuts import render, HttpResponse
from django.db.models import Count
import datetime

from .models import trash_kind, uploaded_trash_image
from rebikeuser.models import user


from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView


from .serializers import TrashkindSerializer, UploadedtrashimageSerializer, UploadedtrashimageDetailSerializer, UploadedtrashimageStatisticsSerializer, UploadedtrashimageCreateSerializer

# Create your views here.


@api_view(['GET'])
def histories(request, user_id):
    uploadedTrashs = uploaded_trash_image.objects.filter(
        user_id=user_id, active=1)
    serializer = UploadedtrashimageSerializer(uploadedTrashs, many=True)
    return Response(serializer.data)


class UploadedtrashimageListAPI(APIView):
    def get(self, request, user_id, uploaded_trash_image_id):
        uploaded_trashs = uploaded_trash_image.objects.filter(
            user_id=user_id, active=1, uploaded_trash_image_id=int(uploaded_trash_image_id))
        serializer = UploadedtrashimageDetailSerializer(
            uploaded_trashs, many=True)
        return Response(serializer.data)
    ############# delete는 데이터 직접 삭제하지 않고 img.active를 0으로,....
    # def delete(self, request, user_id, uploaded_trash_image_id):
    #     uploaded_trashs = uploaded_trash_image.objects.filter(
    #         user_id=user_id, active=1, uploaded_trash_image_id=int(uploaded_trash_image_id))
    #     uploaded_trashs.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, user_id, uploaded_trash_image_id):
        uploaded_trashs = uploaded_trash_image.objects.filter(
            user_id=user_id, active=1, uploaded_trash_image_id=int(uploaded_trash_image_id)).update(active=0)
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def statistics(request, user_id):
    uploaded_trashs = uploaded_trash_image.objects.filter(
        user_id=user_id).values('trash_kind').annotate(cnt=Count('trash_kind'))
    serializer = UploadedtrashimageStatisticsSerializer(
        uploaded_trashs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def statistics_by_date(request, user_id, from_date, to_date):
    start_date = from_date
    end_date = datetime.datetime.strptime(to_date, "%Y-%m-%d").date() + datetime.timedelta(days=1)
    
    uploaded_trashs = uploaded_trash_image.objects.filter(
        user_id=user_id, created_at__range=(start_date, end_date)).values('trash_kind').annotate(cnt=Count('trash_kind'))
    serializer = UploadedtrashimageStatisticsSerializer(
        uploaded_trashs, many=True)
    return Response(serializer.data)


############################## main page api ##############################
################################## under ##################################

class UploadImage(CreateAPIView):
    queryset = uploaded_trash_image.objects.all()
    serializer_class = UploadedtrashimageCreateSerializer


@api_view(['GET'])
def ImageResultPage(request, uploaded_trash_image_id):
    # uploaded_trash_image_id 로 ai.. result
    result = '유리'
    queryset = trash_kind.objects.filter(kind=result)
    serializer = TrashkindSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def SearchResultPage(request, search_word):
    # search_word
    result = search_word
    queryset = trash_kind.objects.filter(kind=result)
    serializer = TrashkindSerializer(queryset, many=True)
    return Response(serializer.data)
