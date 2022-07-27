from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *




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