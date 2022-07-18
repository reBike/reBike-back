from django.urls import path, re_path
from . import views

from django.contrib import admin
from django.urls import include, path, re_path



urlpatterns =[
    #path('mainpage/users/<user_id>/<upload_img>',views.UploadImage.as_view()),
    path('mainpage',views.UploadImage.as_view()),
    path('mainpage/images/<uploaded_trash_image_id>/result',views.ImageResultPage),
    path('mainpage/search-words/<search_word>/result',views.SearchResultPage),

    path('mypage/users/<user_id>/images',views.histories, name='histories'),
    path('mypage/users/<user_id>/images/<uploaded_trash_image_id>',views.UploadedtrashimageListAPI.as_view()),
    path('mypage/users/<user_id>/statistics',views.statistics, name='statistics'),
]

### 자주 쓰이는 코드 유틸화 trashUtils.py