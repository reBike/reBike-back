from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_all_challenges),
    path('/user', views.get_user_challenges)
]
