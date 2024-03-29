from django.http import JsonResponse
from django.shortcuts import HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from .serializers import UserSignupResponse, AutoUpload
from .userUtil import user_find_by_name, user_comppassword, user_create_client, user_generate_access_token, \
    user_generate_refresh_token, user_token_to_data, UserDuplicateCheck, user_refresh_to_access, user_change_value, \
    user_find_by_id
import operator


@api_view(['GET', 'POST', 'PATCH'])
def user(request):
    if request.method == 'GET':
        return user_is_duplicate(request)
    if request.method == 'POST':
        return user_sign_up(request)
    if request.method == 'PATCH':
        return user_patch(request)


def user_is_duplicate(request):
    case = request.GET.get('case')
    value = request.GET.get('value')
    checker = UserDuplicateCheck()

    if case == 'name':
        return JsonResponse({"result": checker.name(value)}, status=200)
    elif case == 'alias':
        return JsonResponse({"result": checker.alias(value)}, status=200)
    elif case == 'email':
        return JsonResponse({"result": checker.email(value)}, status=200)
    else:
        return JsonResponse({"message": "Invalid value"}, status=401)


def user_sign_up(request):
    name = request.data['name']
    password = request.data['password']
    email = request.data['email']
    alias = request.data['alias']

    new_user = user_create_client(name, email, password, alias)
    data = UserSignupResponse(new_user, many=False).data
    return Response(data, status=200)


def user_patch(request):
    payload = user_token_to_data(request.headers.get('Authorization', None))
    input_dict = dict(request.data['value'])
    if payload:
        result = user_change_value(value=input_dict, alias=payload.get('alias'))
        access_token = user_generate_access_token(result)
        refresh_token = user_generate_refresh_token(result)
        return JsonResponse({"access_token": access_token, "refresh_token": refresh_token},
                            status=200)
    else:
        return JsonResponse({"message ": payload}, status=401)


class Auth(APIView):
    def post(self, request):
        token = request.headers.get('Authorization', None)
        if token:
            return user_reissuance_access_token(request)
        else:
            return login(request)


def user_reissuance_access_token(request):
    token = request.headers.get('Authorization', None)
    payload = user_token_to_data(request.headers.get('Authorization', None))
    if payload:
        if payload.get('type') == 'refresh_token':
            access_token = user_refresh_to_access(token)
            return JsonResponse({"access_token": access_token}, status=200)  # new access_token 반환
        else:
            return JsonResponse({"message": "it is not refresh_token"}, status=401)
    else:
        return JsonResponse({"message": payload}, status=401)


def login(request):
    input_name = request.data['name']
    input_password = request.data['password']
    access_token = None
    refresh_token = None

    if input_password and input_name:
        user_data = user_find_by_name(input_name).first()
        if user_data:
            if user_comppassword(input_password, user_data):
                access_token = user_generate_access_token(user_data)
                refresh_token = user_generate_refresh_token(user_data)
        else:
            return JsonResponse({"message": "invalid_data"}, status=400)

    data = {"access_token": access_token, "refresh_token": refresh_token}

    return JsonResponse(data, status=200)


class Autosave(APIView):
    def get(self, request):
        payload = user_token_to_data(request.headers.get('Authorization', None))
        user_data = user_find_by_id(payload.get('id')).first()
        data = {"user_autosave": user_data.autosave}
        return JsonResponse(data, status=200)

    def patch(self, request):
        payload = user_token_to_data(request.headers.get('Authorization', None))
        user_data = user_find_by_id(payload.get('id')).first()
        user_data.autosave = not user_data.autosave
        user_data.save()
        data = {"user_autosave": user_data.autosave}
        return JsonResponse(data, status=200)
