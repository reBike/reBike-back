from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'user_name', 'user_alias', 'user_pw', 'user_email']
    search_fields = ['id']
