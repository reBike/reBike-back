from django.db.models import fields
from rest_framework import serializers
from .models import user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['name', 'alias', 'email'] #Front에 3필드만


#rebikeuser/serializers.py
class UserSignupResponse(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['id']
