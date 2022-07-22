from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import UserSignupResponse, AutoUpload
from .userUtil import user_find_by_name, user_compPW, user_create_client, user_change_pw, user_change_alias, \
    user_generate_access_token, user_generate_refresh_token, user_token_to_data, user_duplicate_check, user_deactivate,\
    user_refresh_to_access


@api_view(['POST'])
def user_is_duplicate(request):
    case = request.data['case']
    value = request.data['value']

    if case == 'name':
        return JsonResponse({"result": user_duplicate_check.name(value)}, status=200)
    elif case == 'alias':
        return JsonResponse({"result": user_duplicate_check.alias(value)}, status=200)
    elif case == 'email':
        return JsonResponse({"result": user_duplicate_check.email(value)}, status=200)
    else:
        return JsonResponse({"message": "Invalid value"}, status=400)


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

    data = {"access_token": access_token, "refresh_token": refresh_token, "save_img": user.save_img}
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
            return JsonResponse({"message": "success"}, status=200)
        else:
            return JsonResponse({"message": "Invalid Password"}, status=400)
    else:
        return JsonResponse({"message": "Invalid Token"}, status=403)


@api_view(['POST'])
def user_alias_change(request):
    input_alias = request.data['alias']
    access_token = request.headers.get('Authorization', None)
    payload = user_token_to_data(access_token)
    if payload:
        find_user = user_find_by_name(payload.name)
        user_change_alias(find_user, input_alias)
        return JsonResponse({"message": "success"}, status=200)
    else:
        return JsonResponse({"message": "Invalid Token"}, status=403)


@api_view(['POST'])
def user_sign_out(request):
    access_token = request.headers.get('Authorization', None)
    payload = user_token_to_data(access_token)
    if payload:
        d_user = user_find_by_name(payload.name).first()
        user_deactivate(d_user.pw, d_user)
        return JsonResponse({"message": "success"}, status=200)
    else:
        return JsonResponse({"message": "Invalid Token"}, status=403)


@api_view(['POST'])
def user_reissuance_access_token(request):
    refresh_token = request.headers.get('Authorization', None)
    access_token = user_refresh_to_access(refresh_token)
    if access_token:
        return JsonResponse({"refresh_token": refresh_token, "access_token": access_token}, status=200)
    else:
        return JsonResponse({"message": "Invalid Token"}, status=403)


@api_view(['POST'])
def user_set_autosave(request):
    access_token = request.headers.get('Authorization', None)
    save_img = request.data['save_img']
    payload = user_token_to_data(access_token)
    if payload:
        user = user_find_by_name(payload.name).first()
        user.save_img=save_img
        user.save()
        # serializer = AutoUpload(data={"save_img": user.save_img})
        # if serializer.is_valid():
        #     data = {
        #         "save_img": serializer.data
        #     }
        #     return JsonResponse(data)

# 로그인 => 엑세스토큰 , 리프레시 토큰, 세이브이미지
# 토글 다다다다다 => 로컬스토리지
# 엑세스토큰 재발급 => db 접근, 세이브이미지 값 변경해주기
