from django.urls import path, re_path
from . import views

from django.contrib import admin
from django.urls import include, path, re_path



urlpatterns =[
    path('mainpage/trashkind/',views.TrashkindListAPI.as_view()),
    path('mypage/<user_id>/image/',views.histories, name='histories'),
    path('mypage/<user_id>/image/<uploaded_trash_image_id>/',views.UploadedtrashimageListAPI.as_view()),
    #path('mypage/<user_id>/statistics/',views.statistics, name='statistics'),
]


### 유저 페이지 진입 시 액티브된 계정인지(있는지 없는지 확인)
### 통계페이지 (액티브 상관 없이 받아오기!)
### 자주 쓰이는 코드 유틸화 trashUtils.py

### swagger, postman 확인 -> 성빈님
