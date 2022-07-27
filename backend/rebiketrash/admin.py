from django.contrib import admin

from .models import trash


@admin.register(trash)
class TrashKindAdmin(admin.ModelAdmin):
    list_display = ['trash_id', 'is_on_basket', 'img', 'owner']
    search_fields = ['name']
