from django.urls import path
from . import views

# rebikeuser/urls.py
urlpatterns = [
<<<<<<< HEAD
    path('login/', views.user_login),# 로그인
    path('signup/', views.user_sign_up),# 회원가입
    path('changepw/', views.user_pw_change),#

    path('changealias/', views.user_alias_change),
    path('signout/', views.user_sign_out),
    path('reissuance/', views.user_reissuance_access_token),

    path('decode/', views.user_decode_token),  # csrf 에러
    path('checkdup/', views.user_is_duplicate),  # 클래스 방법 찾기
    path('autosave/', views.user_set_autosave)  # 조언 듣기
=======
    path('login/', views.user_login),  # auth , get
    path('signup/', views.user_sign_up),  # user , post
    path('changepw/', views.user_pw_change),  # user , patch
    path('changealias/', views.user_alias_change),  # user, patch
    path('signout/', views.user_sign_out),  # user patch (delete 가 맞긴 한데 실질적으로 db에서 지우는건 아니니까)
    path('reissuance/', views.user_reissuance_access_token),  # auth, get
    path('decode/', views.user_decode_token),  # 프론트로 준다

    path('checkdup/', views.user_is_duplicate),  # user, get
    path('autosave/', views.user_set_autosave)  # user , patch

    # user 를 테이블로 생각
    # auth
>>>>>>> 179baf936f01f3a14ae0ccc10ae8647f24121ded
]
