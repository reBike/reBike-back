from urllib import response
from django.shortcuts import render, HttpResponse
from django.db.models import Count

from .models import trash_kind, uploaded_trash_image, challenge, user_challenge
from rebikeuser.models import user

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from .serializers import TrashKindSerializer, UploadedTrashImageSerializer, UploadedTrashImageDetailSerializer, UploadedTrashImageStatisticsSerializer, ChallengeSerializer, UserChallengeSerializer

import boto3
from datetime import datetime, timedelta
from backend.settings import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

import torch
import os

############################## utils ##############################
def get_img_url(request):
    s3_client = boto3.client(
        's3',
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY
    )

    image = request.FILES['filename']
    image_time = (str(datetime.now())).replace(" ", "")
    image_type = (image.content_type).split("/")[1]
    s3_client.upload_fileobj(
        image,
        "image-bucket2",
        image_time+"."+image_type,
        ExtraArgs={
            "ContentType": image.content_type
        }
    )
    image_url = "http://image-bucket2.s3.ap-northeast-2.amazonaws.com/" + \
        image_time+"."+image_type
    image_url = image_url.replace(" ", "/")
    return image_url

def get_ai_result(instance):
    hubconfig = os.path.join(os.getcwd(), 'rebiketrash', 'yolov5')
    weightfile = os.path.join(os.getcwd(), 'rebiketrash', 'yolov5',
                              'runs', 'train', 'garbage_yolov5s_results', 'weights', 'best.pt')
    model = torch.hub.load(hubconfig, 'custom',
                           path=weightfile, source='local')
    results = model(instance)
    results_dict = results.pandas().xyxy[0].to_dict(orient="records")
    if not results_dict:
        return 0
    return results_dict[0].get('name')

############################## mypage api ##############################

class UploadedTrashImageListAPI(APIView):
    def get(self, user_id):
        uploaded_trashs = uploaded_trash_image.objects.filter(
            user_id=user_id, active=1)
        serializer = UploadedTrashImageSerializer(uploaded_trashs, many=True)
        return Response(serializer.data)


class UploadedTrashImageDetailListAPI(APIView):
    def get(self, user_id, uploaded_trash_image_id):
        uploaded_trash = uploaded_trash_image.objects.filter(
            user_id=user_id, active=1, uploaded_trash_image_id=int(uploaded_trash_image_id))
        serializer = UploadedTrashImageDetailSerializer(
            uploaded_trash, many=True)
        return Response(serializer.data)

    def delete(self, user_id, uploaded_trash_image_id):
        uploaded_trash_image.objects.filter(
            user_id=user_id, active=1, uploaded_trash_image_id=int(uploaded_trash_image_id)).update(active=0)
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def statistics(user_id):
    uploaded_trashs = uploaded_trash_image.objects.filter(
        user_id=user_id).values('trash_kind').annotate(cnt=Count('trash_kind'))
    serializer = UploadedTrashImageStatisticsSerializer(
        uploaded_trashs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def statistics_by_date(user_id, from_date, to_date):
    start_date = from_date
    end_date = datetime.strptime(
        to_date, "%Y-%m-%d").date() + timedelta(days=1)

    uploaded_trashs = uploaded_trash_image.objects.filter(
        user_id=user_id, created_at__range=(start_date, end_date)).values('trash_kind').annotate(cnt=Count('trash_kind'))
    serializer = UploadedTrashImageStatisticsSerializer(
        uploaded_trashs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_all_challenges():
    all_challenges = challenge.objects.all()
    serializer = ChallengeSerializer(all_challenges)
    return Response(serializer.data)

@api_view(['GET'])
def get_user_challenges(user_id):
    user_challenges = user_challenge.objects.filter(user_id = user_id).order_by('challenge_number')
    serializer = UserChallengeSerializer(user_challenges)
    return Response(serializer.data)

############################## mainpage api ##############################

@api_view(['GET'])
def popular_garbage_statistics():
    start_date = datetime.today() + timedelta(days=-6)
    end_date = datetime.today() + timedelta(days=1)
    queryset = uploaded_trash_image.objects.filter(created_at__range=(start_date, end_date)).values(
        'trash_kind').annotate(cnt=Count('trash_kind')).order_by('-cnt')
    serializer = UploadedTrashImageStatisticsSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def search_result_page(search_word):
    # search_word
    ai_result = search_word
    queryset = trash_kind.objects.filter(kind=ai_result)
    serializer = TrashKindSerializer(queryset, many=True)
    return Response(serializer.data)


class UploadImage(APIView):
    def post(self, request, user_id):
        image_url = get_img_url(request)
        ai_result = get_ai_result(image_url)

        if ai_result == 0:  # 사진이 분류되지 않을 경우
            return Response(status=status.HTTP_204_NO_CONTENT)

        user_info = user.objects.get(id=user_id)

        uploaded_trash_image.objects.create(
            active=user_info.save_img, img=image_url, user_id=user_info, trash_kind=trash_kind.objects.get(kind=ai_result))

        trash_info = trash_kind.objects.filter(kind=ai_result)
        serializer = TrashKindSerializer(trash_info, many=True)
        return Response(serializer.data)

