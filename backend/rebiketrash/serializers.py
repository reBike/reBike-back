import imp
from pyexpat import model
from rest_framework import serializers
from .models import trash_kind, uploaded_trash_image, challenge, user_challenge
from django.db.models import Count


class TrashKindSerializer(serializers.ModelSerializer) :
    class Meta :
        model = trash_kind    
        fields = ('name', 'way')          

class UploadedTrashImageSerializer(serializers.ModelSerializer) :
    class Meta :
        model = uploaded_trash_image       
        fields = ("uploaded_trash_image_id", "img", "trash_kind")            

class UploadedTrashImageDetailSerializer(serializers.ModelSerializer) :
    class Meta :
        model = uploaded_trash_image       
        fields = '__all__'  

class UploadedTrashImageStatisticsSerializer(serializers.Serializer) :
    trash_kind = serializers.SerializerMethodField()
    cnt = serializers.SerializerMethodField()

    class Meta :
        model = uploaded_trash_image
        fields = '__all__'
    
    def get_trash_kind(self, model_instance):
        return model_instance['trash_kind']

    def get_cnt(self, model_instance):
        return model_instance['cnt']


class ChallengeSerializer(serializers.ModelSerializer) :
    class Meta :
        model = challenge
        fields = ("number","content")

class UserChallengeSerializer(serializers.ModelSerializer) :
    class Meta :
        model = user_challenge
        fields = ("challenge_number","created_at")
