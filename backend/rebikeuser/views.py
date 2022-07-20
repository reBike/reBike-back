from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
from rest_framework.decorators import api_view

from .serializers import UserSerializer, UserSignupResponse, SignupInput, AutoUpload
from .userUtil import user_find_by_name, user_compPW, user_create_client, user_change_pw, user_change_alias, \
    login_check, generate_access_token
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import HttpResponse
from .models import user

from .JWT_Settings import ALGORITHM, SECRET_KEY
import jwt


@api_view(['POST'])
def user_login(request):
    input_name = request.data['name']
    input_pw = request.data['pw']
    is_login = False
    user_data = None
    access_token = None

    data = {"user": None, "is_login": is_login, "access_token": access_token}
    if input_pw and input_name:
        user = user_find_by_name(input_name).first()
        if user:
            if user_compPW(input_pw, user):
                access_token = generate_access_token(user, SECRET_KEY, ALGORITHM)
                temp = UserSerializer(data={'name': user.name, 'alias': user.alias, 'email': user.email})
                if temp.is_valid():
                    user_data = temp.data
                    is_login = True
        data = {
            "user": user_data,
            "is_login": is_login,
            "access_token": access_token
        }
    return Response(data)


# rebikeuser/views.py
class UserSignupAPI(APIView):
    def post(self, request):
        name = request.data['name']  # dict로 되있음
        pw = request.data['pw']  # 바디 읽는 법
        alias = request.data['alias']
        email = request.data['email']

        str = user_create_client(name, email, pw, alias)
        if str == 1:
            return HttpResponse('중복된 이름입니다.')
        elif str == 2:
            return HttpResponse('중복된 닉네임입니다.')
        elif str == 3:
            return HttpResponse('중복된 이메일입니다.')
        else:
            serializer2 = UserSignupResponse(str, many=False)
            return Response(serializer2.data)  # Only name


@api_view(['POST'])
@login_check
def user_pw_change(request):
    input_name = request.data['name']
    input_pw = request.data['pw']  # 새 비밀번호
    input_past_pw = request.data['pastpw']  # 이전 비밀번호

    if input_name and input_pw and input_past_pw:
        finduser = user_find_by_name(input_name).first()
        if user_compPW(input_past_pw, finduser):  # 예전 pw와 name으로 찾은 user의 pw 일치여부
            user_change_pw(finduser, input_pw)
            return HttpResponse("성공")
        else:
            return HttpResponse('이전 비밀번호가 일치 하지 않습니다.')
    else:
        return HttpResponse('실패')


@api_view(['POST'])
@login_check
def user_alias_change(request):
    input_name = request.data['name']
    input_alias = request.data['alias']

    if input_alias and input_name:
        finduser = user_find_by_name(input_name).first()
        if finduser:
            user_change_alias(finduser, input_alias)  # True : 변경됨, False : 변경실패
            return HttpResponse('성공')
    return HttpResponse("실패")


@api_view(['POST'])
@login_check
def deactivateUser(request):
    name = request.data['name']
    pw = request.data['pw']
    d_user = user_find_by_name(name).first()
    if d_user and user_compPW(pw, d_user):
        d_user.active = 0
        d_user.save()
        return HttpResponse("계정이 비활성화 되었습니다.")
    else:
        return HttpResponse("아이디 또는 비밀번호가 틀렸습니다."), redirect('/user/login/')


@api_view(['GET'])
def on_login(request):
    qs = user.objects.all()
    username = request.GET.get('username', '')
    if username:
        qs = qs.filter(user_name=username)
    return HttpResponse(qs)


# 
@api_view(['POST'])
@login_check
def isAutoSave(request):
    name = request.data['name']
    is_login = request.data['is_login']
    user = user_find_by_name(name).first()
    if user.save_img == 1 and is_login:
        user.save_img = 0
        user.save()
    elif user.save_img == 0 and is_login:
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
