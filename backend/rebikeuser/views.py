from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .serializers import UserSerializer
from .userUtil import user_find_by_name, user_compPW, user_create_client, user_change_pw, user_change_alias


def user_login(request):
    input_id = request.GET.get('id', '')
    input_pw = request.GET.get('pw', '')
    is_login = False
    user_data = None

    if input_pw != '' and input_id != '':
        user = user_find_by_name(input_id).first()
        if user:
            is_login = user_compPW(input_pw, user)
            if is_login:
                user_data = UserSerializer(user)

    data = {
        'user': user_data,
        'is_login': is_login,
    }

    return JsonResponse(data)


def user_signup(request):
    user_id = request.GET.get('id')
    alias = request.GET.get('alias')
    email = request.GET.get('email')
    pw = request.GET.get('pw')

    user_create_client(user_id, email, pw, alias)

    return HttpResponse(user_id)


def user_pw_change(request):
    input_id = request.GET.get('id', '')
    input_pw = request.GET.get('pw', '')
    result = False

    if input_pw and input_id:
        user = user_find_by_name(input_id).first()
        if user:
            result = user_change_pw(user, input_pw)

    return HttpResponse(result)


def user_alias_change(request):
    input_id = request.GET.get('id', '')
    input_alias = request.GET.get('alias', '')
    result = False

    if input_alias and input_id:
        user = user_find_by_name(input_id).first()
        if user:
            result = user_change_alias(user, input_alias)

    return HttpResponse(result)
