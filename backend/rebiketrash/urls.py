from django.urls import path
from . import views

urlpatterns =[
    path('mainpage/search-words/<search_word>/result',views.search_result_page),#토큰 X
    path('mainpage/users/<user_id>/result',views.UploadImage.as_view()),#토큰 X
    path('mainpage',views.popular_garbage_statistics), #토큰 X

    path('mypage/users/<user_id>/images/<page_number>',views.UploadedTrashImageListAPI.as_view()),
    path('mypage/users/<user_id>/images/<uploaded_trash_image_id>',views.UploadedTrashImageDetailListAPI.as_view()),
    path('mypage/users/<user_id>/statistics',views.statistics),
    path('mypage/users/<user_id>/statistics/period/<from_date>/<to_date>',views.statistics_by_date),
    path('mypage/challenges',views.get_all_challenges),# 토큰 X
    path('mypage/users/<user_id>/challenges',views.get_user_challenges),#토큰 X
]

# - **mypage**
#     - **mypage/users/<user_id>/images/<page_number>**
#     `GET` 유저가 업로드한 (활성화 상태인)이미지 데이터들
#     - **mypage/users/<user_id>/images/<uploaded_trash_image_id>**
#     `GET` 유저가 업로드한 이미지 데이터의 상세정보
#     `DELETE` 이미지 active를 0으로
#     - **mypage/users/<user_id>/statistics**
#     `GET` 유저가 업로드한 모든 쓰레기의 통계 정보
#     - **mypage/users/<user_id>/statistics/period/<from_date>/<to_date>**
#     `GET` 기간별 유저가 업로드한 쓰레기들의 통계 정보
#     - **mypage/challenges**
#     `GET` 모든 챌린지 정보
#     - **mypage/users/<user_id>/challenges**
#     `GET` 유저가 달성한 챌린지 정보
# - **mainpage**
#     - **mainpage/search-words/<search_word>/result**
#     `GET` 검색어에 대한 결과 (쓰레기 종류반환)
#     - **mainpage/users/<user_id>/result**
#     `POST` 업로드된 이미지 사진 저장 및 이미지 사진에 대한 AI판단 결과
#     `GET` 유저의 챌린지 달성 여부 (한 번만 검사, POST 시 한 번씩 GET 해주세요!)
#     - **mainpage**
#     `GET` 일주일 동안의 쓰레기 통계, 인기순으로 정렬된 데이터