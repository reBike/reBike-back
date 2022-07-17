from django.db.models import fields
from rest_framework import serializers
from .models import user


class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=20)
    alias = serializers.CharField(max_length=20)
    email = serializers.CharField(max_length=50)

    class Meta:
        model = user
        fields = ['name', 'alias', 'email']  # Front에 3필드만


# rebikeuser/serializers.py
class UserSignupResponse(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['id']  # 프론트에주는 값


class SignupInput(serializers.ModelSerializer):
    # 검증부
    email = serializers.EmailField()
    pw = serializers.CharField(max_length=60)
    alias = serializers.CharField(max_length=20)
    name = serializers.CharField(max_length=20)

    class Meta:
        model = user
        fields = ['name', 'pw', 'alias', 'email']  # 실제 response할 필드
