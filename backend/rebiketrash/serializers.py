from rest_framework import serializers
from .models import trash


class TrashFindResponse(serializers.ModelSerializer):
    class Meta:
        model = trash
        fields = ['trash_kind', 'is_on_basket', 'img']
