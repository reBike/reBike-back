from pyexpat import model
from rest_framework import serializers
from .models import trash_kind, uploaded_trash_image, challenge, user_challenge

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
    cnt = serializers.SerializerMethodField()

    def get_cnt(self, model_instance):
        return model_instance

    class Meta :
        model = uploaded_trash_image
        fields = ("name","cnt")

class ChallengeSerializer(serializers.Serializer) :
    class Meta :
        model = challenge
        fields = ("number","content")

class UserChallengeSerializer(serializers.Serializer) :
    class Meta :
        model = user_challenge
        fields = ("challenge_number","created_at")
