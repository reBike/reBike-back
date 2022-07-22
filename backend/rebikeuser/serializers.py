import uuid
from rest_framework import serializers
from .models import user
import uuid


class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=20)
    alias = serializers.CharField(max_length=20)
    email = serializers.CharField(max_length=50)
    id = serializers.UUIDField(default=uuid.uuid4)

    class Meta:
        model = user
        fields = ['name', 'alias', 'email', 'id']  # Front에 3필드만


# rebikeuser/serializers.py
class UserSignupResponse(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['name']  # 프론트에주는 값


class SignupInput(serializers.ModelSerializer):
    # 검증부
    email = serializers.CharField(max_length=50)
    pw = serializers.CharField(max_length=60)
    alias = serializers.CharField(max_length=20)
    name = serializers.CharField(max_length=20)

    class Meta:
        model = user
        fields = ('email', 'pw', 'alias', 'name')  # 프론트에주는 값


class AutoUpload(serializers.ModelSerializer):
    save_img = serializers.IntegerField(default=1)

    class Meta:
        model = user
        fields = ['save_img']
