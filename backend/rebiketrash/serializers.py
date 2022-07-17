from rest_framework import serializers
from .models import trash_kind, uploaded_trash_image

class TrashkindSerializer(serializers.ModelSerializer) :
    class Meta :
        model = trash_kind        # product 모델 사용
        fields = '__all__'            # 모든 필드 포함


class UploadedtrashimageSerializer(serializers.ModelSerializer) :
    class Meta :
        model = uploaded_trash_image        # product 모델 사용
        fields = '__all__'            # 모든 필드 포함