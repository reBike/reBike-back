from django.urls import path
from . import views

urlpatterns =[
    path('search-words/<search_word>/kind',views.get_search_result),
    path('users/<user_id>/results',views.UploadImage.as_view()),
    path('statistics/ranking',views.get_statistics_ranking),

    path('users/<user_id>/images',views.TrashImageListAPI.as_view()),
    path('users/<user_id>/images/<trash_image_id>',views.TrashImageDetailListAPI.as_view()),
    path('users/<user_id>/images/<trash_image_id>/kinds',views.get_trash_kinds),
    path('users/<user_id>/statistics',views.get_user_statistics),
    path('users/<user_id>/statistics/period/<from_date>/<to_date>',views.get_user_statistics_by_date),
    path('challenges',views.get_all_challenges),
    path('users/<user_id>/challenges',views.get_user_challenges),
]
