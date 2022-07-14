from django.db.models import fields
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_name', 'user_alias', 'user_email']


def user_to_dict(user):
    result = {
        'id': user.id,
        'user_name': user.user_name,
        'user_alias': user.user_alias,
        'user_pw': user.user_pw,
        'user_salt': user.user_salt,
        'user_email': user.user_email,
    }
    return result
