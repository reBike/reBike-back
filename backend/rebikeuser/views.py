from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view

from .serializers import UserSerializer, UserSignupSerializer
from .userUtil import user_find_by_name, user_compPW, user_create_client, user_change_pw, user_change_alias
from rest_framework.views import APIView
from rest_framework.response import Response


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



class userSingupAPI(APIView):
    def post(self, request):
        name = request.GET.get('name')
        pw = request.GET.get('pw')
        alias = request.GET.get('alias')
        email = request.GET.get('email')


        str = user_create_client(name, email, pw, alias)
        print(str)
        serializer = UserSignupSerializer(str, many=True)
        return Response(serializer.data)    #Only name

# {
#     "id": "1",
#     "pw": "2",
#     "alias": "3",
#     "email": "4",
# }

def user_signup(request):
    name = request.GET.get('id')
    pw = request.GET.get('pw')
    alias = request.GET.get('alias')
    email = request.GET.get('email')

    user_create_client(name, email, pw, alias)
    return HttpResponse(name)


def user_pw_change(request):
    input_id = request.GET.get('id', '')
    input_pw = request.GET.get('pw', '')
    result = False

    if input_pw and input_id:
        user = user_find_by_name(input_id).first()
        if user:
            result = user_change_pw(user, input_pw)

    return HttpResponse(result) #변경완료 시 True


def user_alias_change(request):
    input_id = request.GET.get('id', '')
    input_alias = request.GET.get('alias', '')
    result = False

    if input_alias and input_id:
        user = user_find_by_name(input_id).first()
        if user:
            result = user_change_alias(user, input_alias)

    return HttpResponse(result) #변경완료 시 True
