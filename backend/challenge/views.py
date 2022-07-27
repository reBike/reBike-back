from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from serializers import ChallengeSerializer, UserChallengeSerializer
from .challenge_utils import check_challenge, find_user


@api_view(['GET'])
def get_all_challenges(request):
    all_challenges = challenge.objects.all()
    serializer = ChallengeSerializer(all_challenges, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_user_challenges(request):
    user_id = find_user(request)
    user_challenges = user_challenge.objects.filter(user_id = user_id).order_by('challenge_number')
    serializer = UserChallengeSerializer(user_challenges, many=True)
    return Response(serializer.data)


def get_challenges(request):
    user_id = find_user(request)
    challenge_info = check_challenge(user_id)
    if challenge_info == 0:
        return Response(status=status.HTTP_204_NO_CONTENT)
    serializer = UserChallengeSerializer(challenge_info, many=True)
    return Response(serializer.data)
