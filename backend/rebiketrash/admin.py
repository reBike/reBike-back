from django.contrib import admin

from .models import trash_kind, uploaded_trash_image


@admin.register(trash_kind)
class TrashkindAdmin(admin.ModelAdmin):
    list_display = ['kind', 'way']
    search_fields = ['kind']


@admin.register(uploaded_trash_image)
class UploadedtrashimageAdmin(admin.ModelAdmin):
    list_display = ['uploaded_trash_image_id', 'active', 'img',
                    'created_at', 'updated_at', 'user_id', 'trash_kind']
    search_fields = ['uploaded_trash_image_id']
