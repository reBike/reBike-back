from multiprocessing.sharedctypes import Value
from optparse import Values
from urllib import response
from django.shortcuts import render, HttpResponse
from django.db.models import Q, Count

from .models import trash_kind, uploaded_trash_image, challenge, user_challenge
from rebikeuser.models import user

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from .serializers import TrashKindSerializer, UploadedTrashImageSerializer, UploadedTrashImageDetailSerializer, UploadedTrashImageStatisticsSerializer, ChallengeSerializer, UserChallengeSerializer

from datetime import datetime, timedelta

from .utils import get_img_url, get_ai_result, check_challenge

############################## mypage api ##############################

class UploadedTrashImageListAPI(APIView):
    def get(self, request, user_id):
        uploaded_trashs = uploaded_trash_image.objects.filter(
            user_id=user_id, active=1)
        serializer = UploadedTrashImageSerializer(uploaded_trashs, many=True)
        return Response(serializer.data)


class UploadedTrashImageDetailListAPI(APIView):
    def get(self, request, user_id, uploaded_trash_image_id):
        uploaded_trash = uploaded_trash_image.objects.filter(
            user_id=user_id, active=1, uploaded_trash_image_id=int(uploaded_trash_image_id))
        serializer = UploadedTrashImageDetailSerializer(
            uploaded_trash, many=True)
        return Response(serializer.data)

    def delete(self, request, user_id, uploaded_trash_image_id):
        uploaded_trash_image.objects.filter(
            user_id=user_id, active=1, uploaded_trash_image_id=int(uploaded_trash_image_id)).update(active=0)
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def statistics(request, user_id):
    uploaded_trashs = uploaded_trash_image.objects.filter(user_id=user_id).values('trash_kind').annotate(cnt=Count('trash_kind'))
    serializer = UploadedTrashImageStatisticsSerializer(uploaded_trashs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def statistics_by_date(request, user_id, from_date, to_date):
    start_date = from_date
    end_date = datetime.strptime(to_date, "%Y-%m-%d").date() + timedelta(days=1)

    uploaded_trashs = uploaded_trash_image.objects.filter(
        user_id=user_id, created_at__range=(start_date, end_date)).values('trash_kind').annotate(cnt=Count('trash_kind'))
    serializer = UploadedTrashImageStatisticsSerializer(
        uploaded_trashs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_all_challenges(request):
    all_challenges = challenge.objects.all()
    serializer = ChallengeSerializer(all_challenges, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_user_challenges(request, user_id):
    user_challenges = user_challenge.objects.filter(user_id = user_id).order_by('challenge_number')
    serializer = UserChallengeSerializer(user_challenges, many=True)
    return Response(serializer.data)

############################## mainpage api ##############################

@api_view(['GET'])
def popular_garbage_statistics(request):
    start_date = datetime.today() + timedelta(days=-6)
    end_date = datetime.today() + timedelta(days=1)
    queryset = uploaded_trash_image.objects.filter(created_at__range=(start_date, end_date)).values(
        'trash_kind').annotate(cnt=Count('trash_kind')).order_by('-cnt')
    serializer = UploadedTrashImageStatisticsSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def search_result_page(request,search_word):
    # search_word
    ai_result = search_word
    queryset = trash_kind.objects.filter(name=ai_result)
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
            active=user_info.save_img, img=image_url, user_id=user_info, trash_kind=trash_kind.objects.get(name=ai_result))

        trash_info = trash_kind.objects.filter(name=ai_result)
        serializer = TrashKindSerializer(trash_info, many=True)
        return Response(serializer.data)

    def get(self, request, user_id):
        challenge_info = check_challenge(user_id)
        if challenge_info == 0:
            return Response(status=status.HTTP_204_NO_CONTENT)
        serializer = UserChallengeSerializer(challenge_info, many=True)
        return Response(serializer.data)

