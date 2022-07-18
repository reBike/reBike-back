from pyexpat import model
from rest_framework import serializers
from .models import trash_kind, uploaded_trash_image 

class TrashkindSerializer(serializers.ModelSerializer) :
    class Meta :
        model = trash_kind    
        fields = '__all__'            


class UploadedtrashimageSerializer(serializers.ModelSerializer) :
    class Meta :
        model = uploaded_trash_image       
        fields = ("uploaded_trash_image_id","img")            

class UploadedtrashimageDetailSerializer(serializers.ModelSerializer) :
    class Meta :
        model = uploaded_trash_image       
        fields = '__all__'  

class UploadedtrashimageStatisticsSerializer(serializers.Serializer) :
    cnt = serializers.SerializerMethodField()

    def get_cnt(self, model_instance):
        return model_instance

    class Meta :
        model = uploaded_trash_image
        fields = ("trash_kind","cnt")


class UploadedtrashimageCreateSerializer(serializers.ModelSerializer) :
    class Meta :
        model = uploaded_trash_image       
        fields = ('active', 'img', 'user_id', 'trash_kind')  