from urllib import response
from django.shortcuts import render, HttpResponse
from django.db.models import Count

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

    def delete(self, request, user_id, uploaded_trash_image_id):
        uploaded_trashs = uploaded_trash_image.objects.filter(
            user_id=user_id, active=1, uploaded_trash_image_id=int(uploaded_trash_image_id))
        uploaded_trashs.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def statistics(request, user_id):
    uploaded_trashs = uploaded_trash_image.objects.filter(
        user_id=user_id).values('trash_kind').annotate(cnt=Count('trash_kind'))
    serializer = UploadedtrashimageStatisticsSerializer(
        uploaded_trashs, many=True)
    return Response(serializer.data)

class UploadImage(CreateAPIView):
    queryset = uploaded_trash_image.objects.all()
    serializer_class = UploadedtrashimageCreateSerializer

@api_view(['GET'])
def ImageResultPage(request, uploaded_trash_image_id):
    ############## uploaded_trash_image_id 로 ai.. result
    result = '유리'
    queryset = trash_kind.objects.filter(kind=result)
    serializer = TrashkindSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def SearchResultPage(request, search_word):
    ############## search_word
    result = search_word
    queryset = trash_kind.objects.filter(kind=result)
    serializer = TrashkindSerializer(queryset, many=True)
    return Response(serializer.data)
