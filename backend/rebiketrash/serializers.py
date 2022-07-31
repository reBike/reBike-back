import imp
from pyexpat import model
from rest_framework import serializers
from .models import trash_image, challenge, trash_kind, user_challenge
from django.db.models import Count


class TrashImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = trash_image
        fields = ("trash_image_id", "image")


class TrashImageDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = trash_kind
        fields = ('kind',)


class TrashImageStatisticsSerializer(serializers.Serializer):
    kind = serializers.SerializerMethodField()
    cnt = serializers.SerializerMethodField()

    class Meta:
        model = trash_image
        fields = '__all__'

    def get_kind(self, model_instance):
        return model_instance['kind']

    def get_cnt(self, model_instance):
        return model_instance['cnt']


class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = challenge
        fields = ("number", "content")


class UserChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_challenge
        fields = ("challenge_number", "created_at")