import imp
from pyexpat import model
from rest_framework import serializers
from .models import trash_image, challenge, trash_kind, user_challenge


class TrashImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = trash_image
        fields = ("id", "image")


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
        fields = ("id", "content")


class UserChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_challenge
        fields = ("challenge_id", "created_at")