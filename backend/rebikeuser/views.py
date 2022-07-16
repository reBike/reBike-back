from django.http import HttpResponse, JsonResponse
from django.core import serializers

from .serializers import UserSerializer
from .userUtil import user_find_by_name, user_compPW, user_create_client, user_change_pw, user_change_alias

# 로그인
def user_login(request):
    input_id = request.GET.get('id', '')
    input_pw = request.GET.get('pw', '')
    user_data = None
    is_login = False

    if input_pw != '' and input_id != '':
        user = user_find_by_name(input_id).first()
        if user:
            is_login = user_compPW(input_pw, user)
            if is_login:
                user_data = UserSerializer(user)

    result = {
        'user': user_data.data,
        'is_login': is_login,
    }

    return JsonResponse(result)

# 회원가입
def user_signup(request):
    user_id = request.GET.get('id')
    alias = request.GET.get('alias')
    email = request.GET.get('email')
    pw = request.GET.get('pw')

    result = user_create_client(user_id, email, pw, alias)

    return HttpResponse(result)

# 비밀번호변경
def user_pw_change(request):
    input_id = request.GET.get('id', '')
    input_pw = request.GET.get('pw', '')
    result = False

    if input_pw and input_id:
        user = user_find_by_name(input_id).first()
        if user:
            result = user_change_pw(user, input_pw)

    return HttpResponse(result) #변경완료 시 True

#
def user_alias_change(request):
    input_id = request.GET.get('id', '')
    input_alias = request.GET.get('alias', '')
    result = False

    if input_alias and input_id:
        user = user_find_by_name(input_id).first()
        if user:
            result = user_change_alias(user, input_alias)

    return HttpResponse(result) #변경완료 시 True
