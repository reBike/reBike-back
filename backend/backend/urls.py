
from django.contrib import admin
from django.urls import path, include
from django.contrib import admin
from django.urls import path, include
from rest_framework.permissions import AllowAny
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from django.urls import include, re_path
from rest_framework.permissions import AllowAny


urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('rebikeuser.urls')),
    path('trash/', include('rebiketrash.urls')),
]
