from django.contrib import admin
from .models import user

@admin.register(user)
class UserAdmin(admin.ModelAdmin):

    list_display = ['autosave','active', 'id', 'name', 'alias', 'password', 'salt', 'email']
