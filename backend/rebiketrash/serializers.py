from rest_framework import serializers
from .models import trash


class TrashFindResponse(serializers.ModelSerializer):
    class Meta:
        model = trash
        fields = ['is_on_basket', 'trash_kind', 'img', 'created_at']
