from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.user_login),
    path('signup/', views.user_signup),
    path('changepw/', views.user_pw_change),
    path('changealias/', views.user_alias_change),
]