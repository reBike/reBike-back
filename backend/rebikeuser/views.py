from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import UserSignupResponse
from .userUtil import user_create_client, user_change_value, user_token_to_data, UserDuplicateCheck


@api_view(['GET', 'POST', 'PATCH'])
def user(request):
    if request.method == 'GET':
        return JsonResponse({"method": "get"})
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
    else:
        return JsonResponse({"message": payload}, status=403)
