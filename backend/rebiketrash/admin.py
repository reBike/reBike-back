from django.contrib import admin

from .models import Trashkinds, Uploadedtrash

@admin.register(Trashkinds)
class TrashkindsAdmin(admin.ModelAdmin):
    list_display = ['trash_kind', 'trash_throw_way']
    search_fields = ['trash_kind']

@admin.register(Uploadedtrash)
class UploadedtrashAdmin(admin.ModelAdmin):
    list_display = ['upload_id', 'upload_img', 'upload_date', 'upload_user', 'upload_trash_kind']
    search_fields = ['upload_id']

