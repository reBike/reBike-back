from django.urls import path
from . import views

urlpatterns =[
    path('mainpage/trashkind/',views.TrashkindListAPI.as_view()),

    path('mypage/<user_id>/image/',views.histories, name='histories'),
    path('mypage/<user_id>/image/<uploaded_image_id>/',views.UploadedtrashimageListAPI.as_view()),
    path('mypage/<user_id>/statistics/',views.statistics, name='statistics'),
]