from django.http import HttpResponse, JsonResponse

from django.shortcuts import redirect
from rest_framework.decorators import api_view

from django.core import serializers


from .serializers import UserSerializer, UserSignupResponse, SignupInput
from .userUtil import user_find_by_name, user_compPW, user_create_client, user_change_pw, user_change_alias
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer


from django.http import HttpResponse
from .models import user

@api_view(['POST'])
def user_login(request):
    input_name = request.data['name']
    input_pw = request.data['pw']
    is_login = False

    user_data = None
    is_login = False

    if input_pw and input_name:
        user = user_find_by_name(input_name).first()
        if user:
            if user_compPW(input_pw, user):
                user_data = UserSerializer(data={'name': user.name, 'alias': user.alias, 'email': user.email})
                if user_data.is_valid():
                    data = {
                        "user": user_data.data,
                        "is_login": is_login
                    }
                    return JsonResponse(data)



#rebikeuser/views.py
class UserSignupAPI(APIView):
    def post(self, request):
        name = request.data['name'] #dict로 되있음
        pw = request.data['pw']# 바디 읽는 법
        alias = request.data['alias']
        email = request.data['email']
        serializer = SignupInput(data={'email': email, 'pw': pw, 'alias': alias, 'name': name})
        if serializer.is_valid():
            str = user_create_client(name, email, pw, alias)
            serializer2 = UserSignupResponse(str, many=False)
            return Response(serializer2.data)    #Only name
        return redirect('/user/login/')
# get으로 회원가입 폼 화면 가져오기
#     def get(self, request):
#         return HttpResponse('회원가입 폼 페이지 연결')


@api_view(['POST'])
def user_pw_change(request):
    input_name = request.data['name']
    input_pw = request.data['pw']

    if input_name and input_pw:
        finduser=user_find_by_name(input_name).first()
        if finduser:
            user_change_pw(finduser, input_pw)
            return HttpResponse("성공")
                #user_change_pw(finduser, input_pw)
    else:
        return HttpResponse('실패')


@api_view(['POST'])
def user_alias_change(request):
    input_name = request.data['name']
    input_alias = request.data['alias']

    if input_alias and input_name:
        finduser = user_find_by_name(input_name).first()
        if finduser:
            user_change_alias(finduser, input_alias) # True : 변경됨, False : 변경실패
            return HttpResponse('성공')
    return False


@api_view(['GET'])
def on_login(request):
    qs = user.objects.all()
    username = request.GET.get('username', '')
    if username:
        qs = qs.filter(user_name=username)
    return HttpResponse(qs)
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

