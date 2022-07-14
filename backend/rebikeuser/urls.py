from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.on_login, name='login'),
    path('signup/', views.signup, name='signup'),
]
