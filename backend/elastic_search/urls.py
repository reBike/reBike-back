from django.urls import path
from . import views

urlpatterns = [
    path('', views.elastic_search),
]
