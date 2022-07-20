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

import boto3
from datetime import datetime
from backend.settings import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
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



class Image(APIView):
    def post(self, request, user_id):
        # image
        s3_client = boto3.client(
            's3',
            aws_access_key_id     = AWS_ACCESS_KEY_ID,
            aws_secret_access_key = AWS_SECRET_ACCESS_KEY
        )

        image = request.FILES['filename']  # formdata 키 : filename으로 이미지를 받는다.
        image_time = (str(datetime.now())).replace(" ","") # 이미지이름을 시간으로 설정하기 위해 datetime를 사용했다.
        image_type = (image.content_type).split("/")[1]
        s3_client.upload_fileobj(
            image,
            "image-bucket2", # 버킷이름
            image_time+"."+image_type,
            ExtraArgs = {
                "ContentType" : image.content_type
            }
        )
        image_url = "http://image-bucket2.s3.ap-northeast-2.amazonaws.com/"+image_time+"."+image_type  # 업로드된 이미지의 url이 설정값으로 저장됨
        image_url = image_url.replace(" ","/")
        
        uploaded_trash_image.objects.create(img=image_url, user_id=user.objects.get(id = user_id), trash_kind=trash_kind.objects.get(kind = "유리"))
        return HttpResponse(status=200)