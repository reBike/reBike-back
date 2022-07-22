from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from django.shortcuts import redirect
from rest_framework.decorators import api_view

from .models import user
from .serializers import UserSerializer, UserSignupResponse, SignupInput, AutoUpload
from .userUtil import user_find_by_name, user_compPW, user_create_client, user_change_pw, user_change_alias, \
    user_generate_access_token, user_generate_refresh_token, user_token_to_data, user_duplicate_check_alias, \
    user_duplicate_check_email, user_duplicate_check_name

from .JWT_Settings import ALGORITHM, SECRET_KEY


@api_view(['POST'])
def user_login(request):
    input_name = request.data['name']
    input_pw = request.data['pw']
    access_token = None
    refresh_token = None

    if input_pw and input_name:
        user = user_find_by_name(input_name).first()
        if user:
            if user_compPW(input_pw, user):
                access_token = user_generate_access_token(user)
                refresh_token = user_generate_refresh_token(user)

    data = {"access_token": access_token, "refresh_token": refresh_token}
    return Response(data)


def user_sign_up(request):
    name = request.data['name']
    pw = request.data['pw']
    email = request.data['email']
    alias = request.data['alias']

    new_user = user_create_client(name, email, pw, alias)
    if type(new_user) == int:
        data = {'err_code': new_user}
    else:
        data = UserSignupResponse(new_user, many=False).data
    return Response(data)


@api_view(['POST'])
def user_pw_change(request):
    access_token = request.headers.get('Authorization', None)
    input_pw = request.data['pw']  # 새 비밀번호
    input_past_pw = request.data['pastpw']  # 이전 비밀번호

    payload = user_token_to_data(access_token)
    if payload:
        find_user = user_find_by_name(payload.name)
        if user_compPW(input_past_pw, find_user):
            user_change_pw(find_user, input_pw)
            return HttpResponse("success")
        else:
            return HttpResponse("invalid_password")
    else:
        return HttpResponse("invalid_token")


@api_view(['POST'])
# @login_check
def user_alias_change(request):
    ans = login_check(request)
    if ans == 1:
        input_name = request.data['name']
        input_alias = request.data['alias']

        if input_alias and input_name:
            finduser = user_find_by_name(input_name).first()
            if finduser:
                user_change_alias(finduser, input_alias)  # True : 변경됨, False : 변경실패
                return HttpResponse('성공')
        return HttpResponse("실패")
    elif not ans:
        return JsonResponse({'message': 'INVALID TOKEN'}, status=400)
    else:
        return JsonResponse({'accesstoken': ans})


@api_view(['POST'])
# @login_check
def deactivateUser(request):
    ans = login_check(request)
    if ans == 1:
        name = request.data['name']
        pw = request.data['pw']
        d_user = user_find_by_name(name).first()
        if d_user and user_compPW(pw, d_user):
            d_user.active = 0
            d_user.save()
            return HttpResponse("계정이 비활성화 되었습니다.")
        else:
            return HttpResponse("아이디 또는 비밀번호가 틀렸습니다."), redirect('/user/login/')
    elif not ans:
        return JsonResponse({'message': 'INVALID TOKEN'}, status=400)
    else:
        return JsonResponse({'accesstoken': ans})


@api_view(['GET'])
def on_login(request):
    qs = user.objects.all()
    username = request.GET.get('username', '')
    if username:
        qs = qs.filter(user_name=username)
    return HttpResponse(qs)


# 
@api_view(['POST'])
# @login_check
def isAutoSave(request):
    ans = login_check(request)
    if ans == 1:
        name = request.data['name']
        user = user_find_by_name(name).first()
        if user.save_img == 1:
            user.save_img = 0
            user.save()
        elif user.save_img == 0:
            user.save_img = 1
            user.save()
        else:
            return HttpResponse('로그인 하세요')
        serializer = AutoUpload(data={"save_img": user.save_img})
        if serializer.is_valid():
            data = {
                "save_img": serializer.data
            }
            return JsonResponse(data)
    elif not ans:
        return JsonResponse({'message': 'INVALID TOKEN'}, status=400)
    else:
        return JsonResponse({'accesstoken': ans})

#
# def user_pw_change(request):
#     input_id = request.GET.get('id', '')
#     input_pw = request.GET.get('pw', '')
#     result = False
#
#     if input_pw and input_id:
#         user = user_find_by_name(input_id).first()
#         if user:
#             result = user_change_pw(user, input_pw)
#
#     return HttpResponse(result) #변경완료 시 True
