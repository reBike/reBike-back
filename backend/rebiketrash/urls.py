from django.urls import path
from . import views


urlpatterns =[
    path('mainpage/',views.mainpage),
    path('mypage/', views.mypage),
    #url(r'^insert/(?P<isbn>.+);(?P<title>.+);(?P<memo>.*)', MyAppView.InsertBook),
]