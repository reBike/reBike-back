from django.urls import path, include
from HowTrash import views

urlpatterns = [
    path('', views.index)
]