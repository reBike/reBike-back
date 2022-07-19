from django.contrib import admin
from .models import user

@admin.register(user)
class UserAdmin(admin.ModelAdmin):

    list_display = ['save_img','active', 'id', 'name', 'alias', 'pw', 'salt', 'email']
