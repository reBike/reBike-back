from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.user_login),
    path('signup/', views.user_signup),
    path('changepw/', views.user_change_pw),
    path('changealias/', views.user_change_alias),
]