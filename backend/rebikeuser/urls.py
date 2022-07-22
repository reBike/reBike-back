from django.urls import path
from . import views

# rebikeuser/urls.py
urlpatterns = [
    path('', views.user),
    path('auth/', views.Auth.as_view())
]
