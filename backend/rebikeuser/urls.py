from django.urls import path
from . import views
from .views import userSingupAPI


urlpatterns = [
    path('login/', views.user_login),
    path('signup/', userSingupAPI.as_view()),
    path('changepw/', views.user_pw_change),
    path('changealias/', views.user_alias_change),
]