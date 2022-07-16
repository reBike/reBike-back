from django.http import HttpResponse, JsonResponse
from django.core import serializers

from .serializers import UserSerializer
from .userUtil import user_find_by_name, user_compPW, user_create_client, user_change_pw, user_change_alias

# 로그인
def user_login(request):
    input_id = request.GET.get('id', '')
    input_pw = request.GET.get('pw', '')
    user_data = None
    is_login = False

    if input_pw != '' and input_id != '':
        user = user_find_by_name(input_id).first()
        if user:
            is_login = user_compPW(input_pw, user)
            if is_login:
                user_data = UserSerializer(user)

    result = {
        'user': user_data.data,
        'is_login': is_login,
    }

    return JsonResponse(result)

# 회원가입
class UserSignupAPI(APIView):
    def post(self, request):
        name = request.data['name'] #dict로 되있음
        pw = request.data['pw']
        alias = request.data['alias']
        email = request.data['email']
        serializer = SignupInput(data={'email': email, 'pw': pw, 'alias': alias, 'name': name})
        if serializer.is_valid():
            str = user_create_client(name, email, pw, alias)
            serializer2 = UserSignupResponse(str, many=False)
            return Response(serializer2.data)    #Only name
        return redirect('/user/login/')

# 비밀번호변경
def user_pw_change(request):
    input_id = request.GET.get('id', '')
    input_pw = request.GET.get('pw', '')
    result = False

    if input_pw and input_id:
        user = user_find_by_name(input_id).first()
        if user:
            result = user_change_pw(user, input_pw)

    return HttpResponse(result) #변경완료 시 True

#
def user_alias_change(request):
    input_id = request.GET.get('id', '')
    input_alias = request.GET.get('alias', '')
    result = False

    if input_alias and input_id:
        user = user_find_by_name(input_id).first()
        if user:
            result = user_change_alias(user, input_alias)

    return HttpResponse(result) #변경완료 시 True
