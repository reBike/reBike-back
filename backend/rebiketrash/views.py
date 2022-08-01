from django.shortcuts import render, HttpResponse
from django.db.models import Count
from django.http import JsonResponse

from .models import trash_image, trash_kind, challenge, user_challenge
from rebikeuser.models import user

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from .serializers import TrashImageSerializer, TrashImageDetailSerializer, TrashImageStatisticsSerializer, \
    ChallengeSerializer, UserChallengeSerializer

from datetime import datetime, timedelta

from .utils import get_ai_result, check_challenge
from rebikeuser.userUtil import user_token_to_data
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .tasks import ai_task

############################## result page api ##############################

class TrashImageDetailListAPI(APIView):
    def get(self, request, user_id, trash_image_id):
        payload = user_token_to_data(request.headers.get('Authorization', None))
        if (payload.get('id') == user_id):
            image = trash_image.objects.get(id=int(trash_image_id), user_id=user_id).image
            return JsonResponse({"image": image})
        else:
            return JsonResponse({"message": "Invalid_Token"}, status=401)

    def delete(self, request, user_id, trash_image_id):
        payload = user_token_to_data(request.headers.get('Authorization', None))
        if (payload.get('id') == user_id):
            trash_image.objects.filter(
                user_id=user_id, active=1, id=int(trash_image_id)).update(active=0)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return JsonResponse({"message": "Invalid_Token"}, status=401)


@api_view(['GET'])
def get_trash_kinds(request, user_id, trash_image_id):
    payload = user_token_to_data(request.headers.get('Authorization', None))
    if (payload.get('id') == user_id):
        kinds = trash_kind.objects.filter(trash_image_id=int(trash_image_id), user_id=user_id)
        serializer = TrashImageDetailSerializer(kinds, many=True)
        return Response(serializer.data)
    else:
        return JsonResponse({"message": "Invalid_Token"}, status=401)


############################## user page api ##############################
class TrashImageListAPI(APIView):
    def get(self, request, user_id, page_number):
        payload = user_token_to_data(request.headers.get('Authorization', None))
        if (payload.get('id') == user_id):
            trashs = trash_image.objects.filter(user_id=user_id, active=1).order_by('-created_at')
            paginator = Paginator(trashs, 10)
            page = page_number
            try:
                contacts = paginator.page(page)
            except PageNotAnInteger:
                return Response(status=status.HTTP_204_NO_CONTENT)
            except EmptyPage:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = TrashImageSerializer(contacts, many=True)
            return Response(serializer.data)
        else:
            return JsonResponse({"message": "Invalid_Token"}, status=401)


# pagination !!!!

@api_view(['GET'])
def get_user_statistics(request, user_id):
    payload = user_token_to_data(request.headers.get('Authorization', None))
    if (payload.get('id') == user_id):
        kinds = trash_kind.objects.filter(user_id=user_id).values('kind').annotate(cnt=Count('kind'))
        serializer = TrashImageStatisticsSerializer(kinds, many=True)
        return Response(serializer.data)
    else:
        return JsonResponse({"message": "Invalid_Token"}, status=401)


@api_view(['GET'])
def get_user_statistics_by_date(request, user_id, from_date, to_date):
    payload = user_token_to_data(request.headers.get('Authorization', None))
    if (payload.get('id') == user_id):
        try:
            start_date = from_date
            end_date = datetime.strptime(to_date, "%Y-%m-%d").date() + timedelta(days=1)

            kinds = trash_kind.objects.filter(
                user_id=user_id, created_at__range=(start_date, end_date)).values('kind').annotate(cnt=Count('kind'))
            serializer = TrashImageStatisticsSerializer(kinds, many=True)
            return Response(serializer.data)
        except ValueError:
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return JsonResponse({"message": "Invalid_Token"}, status=401)


@api_view(['GET'])
def get_all_challenges(request):
    all_challenges = challenge.objects.all()
    serializer = ChallengeSerializer(all_challenges, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_user_challenges(request, user_id):
    payload = user_token_to_data(request.headers.get('Authorization', None))
    if (payload.get('id') == user_id):
        user_challenges = user_challenge.objects.filter(user_id=user_id).order_by('challenge_id')
        serializer = UserChallengeSerializer(user_challenges, many=True)
        return Response(serializer.data)
    else:
        return JsonResponse({"message": "Invalid_Token"}, status=401)


############################## main page api ##############################

@api_view(['GET'])
def get_statistics_ranking(request):
    start_date = datetime.today() + timedelta(days=-6)
    end_date = datetime.today() + timedelta(days=1)
    queryset = trash_kind.objects.filter(created_at__range=(start_date, end_date)).values(
        'kind').annotate(cnt=Count('kind')).order_by('-cnt')
    serializer = TrashImageStatisticsSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_search_result(request, search_word):
    ai_result = search_word
    return JsonResponse({'kind': ai_result})


class UploadImage(APIView):
    def post(self, request, user_id):
        payload = user_token_to_data(request.headers.get('Authorization', None))
        if (payload.get('id') == user_id):

            ai_results, image_url = ai_task.delay(request)

            if ai_results == 0:  # 사진이 분류되지 않을 경우
                return Response(status=status.HTTP_204_NO_CONTENT)

            user_info = user.objects.get(id=user_id)
            trash_image.objects.create(active=user_info.autosave, image=image_url, user_id=user_info)

            image_info = trash_image.objects.get(image=image_url, user_id=user_info)
            for ai_result in ai_results:
                trash_kind.objects.create(trash_image_id=image_info, user_id=user_info, kind=ai_result)

            # 챌린지 달성 여부 조사
            challenge_id, challenge_content = check_challenge(user_id)

            return JsonResponse(
                {'image_id': image_info.id, 'challenge': challenge_id, 'challenge_content': challenge_content})
        else:
            return JsonResponse({"message": "Invalid_Token"}, status=401)
