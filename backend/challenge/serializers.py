
from pyexpat import model
from rest_framework import serializers

from .models import challenge, user_challenge



class ChallengeSerializer(serializers.ModelSerializer) :
    class Meta :
        model = challenge
        fields = ("number","content")

class UserChallengeSerializer(serializers.ModelSerializer) :
    class Meta :
        model = user_challenge
        fields = ("challenge_number","created_at")
