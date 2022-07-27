from rest_framework import serializers
from .models import user


class UserSignupResponse(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['name']  # 프론트에주는 값
