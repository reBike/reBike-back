from django.urls import path
from . import views

# rebikeuser/urls.py
urlpatterns = [
    path('login/', views.user_login),
    path('signup/', views.user_sign_up),
    path('changepw/', views.user_pw_change),
    path('changealias/', views.user_alias_change),
    path('deactivateuser/', views.user_deactivate),
    path('autosave/', views.user_set_autosave)
]
