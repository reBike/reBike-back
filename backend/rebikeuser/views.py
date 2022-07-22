from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from .serializers import UserSignupResponse
from .userUtil import user_find_by_name, user_compPW, user_create_client, user_change_alias, \
    user_generate_access_token, user_generate_refresh_token, user_token_to_data, UserDuplicateCheck, user_deactivate, \
    user_refresh_to_access, user_change_value


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
    value = request.GET.get('case')
    checker = UserDuplicateCheck()

    if case == 'name':
        return JsonResponse({"result": checker.name(value)}, status=200)
    elif case == 'alias':
        return JsonResponse({"result": checker.alias(value)}, status=200)
    elif case == 'email':
        return JsonResponse({"result": checker.email(value)}, status=200)
    else:
        return JsonResponse({"message": "Invalid value"}, status=400)


def user_sign_up(request):
    name = request.data['name']
    pw = request.data['pw']
    email = request.data['email']
    alias = request.data['alias']

    new_user = user_create_client(name, email, pw, alias)
    data = UserSignupResponse(new_user, many=False).data
    return Response(data)


def user_patch(request):
    payload = user_token_to_data(request.headers.get('Authorization', None))
    input_dict = dict(request.data['value'])
    if type(payload) != str:
        result = user_change_value(input_dict)
        return JsonResponse({"message": result}, status=200)


class Auth(APIView):
    def get(self, request):
        token = request.headers.get('Authorization', None)
        if token:
            return user_reissuance_access_token(request)
        else:
            return login(request)


def user_reissuance_access_token(refresh_token):
    token = user_token_to_data(refresh_token)
    if token.get('type') == 'refresh_token':
        return user_refresh_to_access(token)  # new accesstoken 반환
    else:
        return False


def login(request):
    input_name = request.GET.get('name')
    input_pw = request.GET.get('pw')
    access_token = None
    refresh_token = None

    if input_pw and input_name:
        user_data = user_find_by_name(input_name).first()
        if user_data:
            if user_compPW(input_pw, user_data):
                access_token = user_generate_access_token(user_data)
                refresh_token = user_generate_refresh_token(user_data)

    data = {"access_token": access_token, "refresh_token": refresh_token}
    return Response(data)
