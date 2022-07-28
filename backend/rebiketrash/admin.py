from django.contrib import admin

from .models import trash_kind, uploaded_trash_image, challenge, user_challenge


@admin.register(trash_kind)
class TrashKindAdmin(admin.ModelAdmin):
    list_display = ['name', 'way']
    search_fields = ['name']


@admin.register(uploaded_trash_image)
class UploadedTrashImageAdmin(admin.ModelAdmin):
    list_display = ['uploaded_trash_image_id', 'active', 'img',
                    'created_at', 'updated_at', 'user_id', 'trash_kind']
    search_fields = ['uploaded_trash_image_id']

    
@admin.register(challenge)
class ChallengeAdmin(admin.ModelAdmin):
    list_display = ['number', 'content', 'created_at', 'updated_at']

@admin.register(user_challenge)
class UserChallengeAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'challenge_number', 'created_at', 'updated_at']
