from django.contrib import admin

from .models import trash_image, trash_kind, challenge, user_challenge


@admin.register(trash_image)
class TrashImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'active', 'image', 'created_at', 'updated_at', 'user_id']
    search_fields = ['id']


@admin.register(trash_kind)
class TrashKindAdmin(admin.ModelAdmin):
    list_display = ['trash_image_id', 'user_id', 'kind', 'created_at', 'updated_at']


@admin.register(challenge)
class ChallengeAdmin(admin.ModelAdmin):
    list_display = ['id', 'content', 'created_at', 'updated_at']


@admin.register(user_challenge)
class UserChallengeAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'challenge_id', 'created_at', 'updated_at']

