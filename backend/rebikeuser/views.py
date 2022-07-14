from django.http import HttpResponse
from django.utils.datastructures import MultiValueDictKeyError
from django.views.decorators.csrf import csrf_exempt

from .models import User
from .forms import UserForm
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect

def on_login(request):
    qs = User.objects.all()
    username = request.GET.get('username', '')
    if username:
        qs = qs.filter(user_name=username)
    return HttpResponse(qs)

# @csrf_exempt
# def signup(request):
#     # POST
#     if request.method == 'POST':
#         # password와 confirm에 입력된 값이 같다면
#         form = UserForm(request.POST)
#         if form:
#             form.save()
#
#             #form에서 하나씩 추출
#             username=form.cleaned_data.get('username')
#             raw_password = form.cleaned_data.get('password')
#             email=form.cleaned_data.get('email')
#             nickname=form.cleaned_data.get('nickname')
#
#             #DB저장
#             User.objects.create(
#                     user_name=username,
#                     user_alias=nickname,
#                     user_pw=raw_password,
#                     user_email=email,
#                 )
#
#             # 인증 -> 로그인 -> 리디렉션
#             user = authenticate(username=username, password=raw_password)  # 사용자 인증
#             login(request, user)
#             return redirect('/')
#
#     # GET ( "가입 된 회원입니다. ")
#     return render(request, 'signup.html')
# # 장고 뷰는 httpresponse가 있어야함
@csrf_exempt
def signup(request):

    if request.method=='POST':
        try:
            user_name=request.POST.get['user_name']
            user_alias=request.POST['user_alias']
            user_email=request.POST['user_email']
            user_pw=request.POST['user_pw']
            user_salt=request.POST['user_salt']
        except MultiValueDictKeyError:
            user_name=False

        user = User.objects.create_user(user_name,user_email, user_pw)
        user.user_alias=user_alias
        user.user_salt=user_salt
        user.save()

        return redirect('/')
    return render(request, "signup.html")
