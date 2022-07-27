from django.urls import path
from . import views

urlpatterns = [
    path('mypage/challenges', views.get_all_challenges),
    path('mypage/users/<user_id>/challenges', views.get_user_challenges)
]
