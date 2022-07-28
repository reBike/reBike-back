from django.urls import path
from . import views

urlpatterns =[
    path('mainpage/search-words/<search_word>/result',views.search_result_page),
    path('mainpage/users/<user_id>/result',views.UploadImage.as_view()),
    path('mainpage',views.popular_garbage_statistics),

    path('mypage/users/<user_id>/images',views.UploadedTrashImageListAPI.as_view()),
    path('mypage/users/<user_id>/images/<uploaded_trash_image_id>',views.UploadedTrashImageDetailListAPI.as_view()),
    path('mypage/users/<user_id>/statistics',views.statistics),
    path('mypage/users/<user_id>/statistics/period/<from_date>/<to_date>',views.statistics_by_date),
    path('mypage/challenges',views.get_all_challenges),
    path('mypage/users/<user_id>/challenges',views.get_user_challenges),
]

