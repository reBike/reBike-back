from django.urls import path
from . import views

# rebikeuser/urls.py
urlpatterns = [
    path('login/', views.user_login),
    path('signup/', views.user_sign_up),
    path('changepw/', views.user_pw_change),
    path('changealias/', views.user_alias_change),
    path('signout/', views.user_sign_out),
    path('reissuance/', views.user_reissuance_access_token),
    path('decode/', views.user_decode_token),

    path('checkdup/', views.user_duplicate_check),  # 클래스 방법 찾기
    path('autosave/', views.user_set_autosave)  # 조언 듣기
]
