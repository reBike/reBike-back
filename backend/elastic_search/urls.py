from django.urls import path
from . import views

urlpatterns = [
    path('name/', views.elastic_search_get_by_name),
    path('desc/', views.elastic_search_get_by_desc),
    path('', views.elastic_search_post),
]
