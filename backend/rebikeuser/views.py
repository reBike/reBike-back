from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from .serializers import UserSignupResponse
from .userUtil import user_find_by_name, user_compPW, user_create_client, user_change_pw, user_change_alias, \
    user_generate_access_token, user_generate_refresh_token, UserDuplicateCheck, user_deactivate, \
    user_refresh_to_access, user_token_to_data, UserDuplicateCheck
    user_generate_access_token, user_generate_refresh_token, user_token_to_data, UserDuplicateCheck, user_deactivate, \
    user_refresh_to_access


class Auth(APIView):
    def post(self, request):
        return JsonResponse({"method": "post"})

    def get(self, request):
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

    def patch(self, request):
        return JsonResponse({"method": "patch"})

    def put(self, request):
        return JsonResponse({"method": "put"})

    def delete(self, request):
        return JsonResponse({"method": "delete"})

@api_view(['GET'])
def user_reissuance_access_token(request):
    token = user_token_to_data(request.headers.get('Authorization', None))
    if token.get('type')=='refreshtoken':
        return user_refresh_to_access(token) # new accesstoken 반환
    else:
        return False

#
@api_view(['POST'])
def user_decode_token(request):
    access_token = request.headers.get('Authorization')
    payload = user_token_to_data(access_token)
    if payload:
        return JsonResponse({'name': payload.get('name'), 'alias': payload.get('alias'), 'email': payload.get('email')},
                            status=200)
    else:
        return JsonResponse({"message": payload}, status=403)


# 방법
@api_view(['POST'])
def user_is_duplicate(request):
    case = request.data['case']
    value = request.data['value']
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


@api_view(['POST'])
def user_pw_change(request):
    access_token = request.headers.get('Authorization', None)
    input_pw = request.data['pw']
    input_past_pw = request.data['pastpw']

    payload = user_token_to_data(access_token)
    if type(payload) != str:
        find_user = user_find_by_name(payload.get('name')).first()
        if user_compPW(input_past_pw, find_user):
            user_change_pw(find_user, input_pw)
            return JsonResponse({"message": "success"}, status=200)
        else:
            return JsonResponse({"message": "Invalid Password"}, status=400)
    else:
        return JsonResponse({"message": payload}, status=403)


@api_view(['POST'])
def user_alias_change(request):
    input_alias = request.data['alias']
    access_token = request.headers.get('Authorization', None)
    payload = user_token_to_data(access_token)
    if payload:
        find_user = user_find_by_name(payload.get('name')).first()
        user_change_alias(find_user, input_alias)
        return JsonResponse({"message": "success"}, status=200)
    else:
        return JsonResponse({"message": payload}, status=403)


@api_view(['POST'])
def user_sign_out(request):
    access_token = request.headers.get('Authorization', None)
    payload = user_token_to_data(access_token)
    if payload:
        d_user = user_find_by_name(payload.get('name')).first()
        user_deactivate(d_user.pw, d_user)
        return JsonResponse({"message": "success"}, status=200)
    else:
        return JsonResponse({"message": payload}, status=403)





#
@api_view(['POST'])
def user_set_autosave(request):
    access_token = request.headers.get('Authorization', None)
    save_img = request.data['save_img']
    payload = user_token_to_data(access_token)
    if payload:
        user = user_find_by_name(payload.get('name')).first()
        user.save_img = save_img
        user.save()
        return JsonResponse({"message": "success"}, status=200)
    else:
        return JsonResponse({"message": payload}, status=403)
