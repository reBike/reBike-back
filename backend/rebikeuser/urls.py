from django.urls import path
from . import views
from .views import UserSignupAPI

# rebikeuser/urls.py
urlpatterns = [
    path('login/', views.user_login),
    path('signup/', views.UserSignupAPI.as_view()),
    path('changepw/', views.user_pw_change),
    path('changealias/', views.user_alias_change),
    path('deactivateuser/', views.deactivateUser),
    path('autosave/', views.isAutoSave)
]
