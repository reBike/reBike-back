from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from django.shortcuts import redirect
from rest_framework.decorators import api_view

from .models import user
from .serializers import UserSerializer, UserSignupResponse, SignupInput, AutoUpload
from .userUtil import user_find_by_name, user_compPW, user_create_client, user_change_pw, user_change_alias, \
    user_generate_access_token, user_generate_refresh_token, user_token_to_data, user_duplicate_check

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
        data = {'err_code': new_user, }
    else:
        data = UserSignupResponse(new_user, many=False).data
    return Response(data)


@api_view(['POST'])
def user_pw_change(request):
    access_token = request.headers.get('Authorization', None)
    input_pw = request.data['pw']
    input_past_pw = request.data['pastpw']

    payload = user_token_to_data(access_token)
    if payload:
        find_user = user_find_by_name(payload.name)
        if user_compPW(input_past_pw, find_user):
            user_change_pw(find_user, input_pw)
            return JsonResponse({"message": "success"}, status=200 )
        else:
            return JsonResponse({"message": "Invali Password"}, status=400 )
    else:
        return JsonResponse({"message": "Invalid Token"}, status=403 )

@api_view(['POST'])
def user_alias_change(request):
    input_alias = request.data['alias']
    access_token = request.headers.get('Authorization', None)
    payload = user_token_to_data(access_token)
    if payload:
        find_user = user_find_by_name(payload.name)
        user_change_alias(find_user, input_alias)
        return HttpResponse("success")
    else:
        return HttpResponse("invalid_token")


@api_view(['POST'])
def user_deactivate(request):
        name = request.data['name']
        pw = request.data['pw']
        access_token = request.headers.get('Authorization', None)
        payload = user_token_to_data(access_token)
        if payload:
            d_user = user_find_by_name(payload.name).first()
            user_deactivate(pw, d_user)
                return HttpResponse("계정이 비활성화 되었습니다.")
            else:
                return HttpResponse("아이디 또는 비밀번호가 틀렸습니다."), redirect('/user/login/')


def user_set_autosave(request):
        name = request.data['name']
        access_token = request.headers.get('Authorization', None)
        payload = user_token_to_data(access_token)
        if payload:
            user = user_find_by_name(payload.name).first()
            user_set_autosave(user)
            serializer = AutoUpload(data={"save_img": user.save_img})
            if serializer.is_valid():
                data = {
                    "save_img": serializer.data
                }
                return JsonResponse(data)