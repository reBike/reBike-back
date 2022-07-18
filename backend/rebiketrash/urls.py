from django.urls import path
from . import views

urlpatterns =[
    #path('mainpage/users/<user_id>/<input_image>',views.CreateImage.as_view()),
    path('mainpage',views.CreateImage.as_view()),

    path('mypage/users/<user_id>/images',views.histories, name='histories'),
    path('mypage/users/<user_id>/images/<uploaded_trash_image_id>',views.UploadedtrashimageListAPI.as_view()),
    path('mypage/users/<user_id>/statistics',views.statistics, name='statistics'),
]

### 자주 쓰이는 코드 유틸화 trashUtils.py