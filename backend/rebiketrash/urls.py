from django.urls import path
from . import views

urlpatterns =[
    path('mainpage/trashkind/',views.TrashkindListAPI.as_view()),

    path('mypage/<user_id>/',views.histories, name='histories'),
    path('mypage/<user_id>/image/<uploaded_image_id>/',views.UploadedtrashimageListAPI.as_view()),
]
# 변수명 자세하게
# user_id -> UUID
# mypage/<user_id>/Image/<upload_id>/
# DB 컬럼이름
# modify date