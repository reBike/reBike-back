import uuid
import bcrypt
import jwt

from .JWT_Settings import ALGORITHM, SECRET_KEY, jWT_EXPIRATION_DELTA
from .models import user
from django.http import HttpResponse, JsonResponse
from datetime import datetime, timedelta


# # 로그인 인증 데코레이터 필요한 경우 @login_check으로 실행
# def login_check(func):
#     def wrapper(request, *args, **kwargs):
#         try:
#             access_token = request.headers.get('Authorization', None)
#             payload = jwt.decode(access_token, SECRET_KEY, algorithms=ALGORITHM)
#             user_name = user.objects.get(name=payload['name'])
#             request.user = user_name
#         except jwt.exceptions.DecodeError:
#             return JsonResponse({'message': 'INVALID TOKEN'}, status=400)
#         except user.DoesNotExist:
#             return JsonResponse({'message': 'INVALID USER'}, status=400)
#         except jwt.exceptions.ExpiredSignatureError:
#             return JsonResponse({'message': 'INVALID TOKEN'}, status=400)
#         return func(request, *args, **kwargs)
#
#     return wrapper

# 로그인 인증 데코레이터 필요한 경우 @login_check으로 실행
# def login_check(func):
#     def wrapper(request, *args, **kwargs):
#         try:
#             access_token = request.headers.get('Authorization', None)
#             refresh_token = request.headers.get('Authorization2', None)
#             access_payload = jwt.decode(access_token, SECRET_KEY, algorithms=ALGORITHM)
#             refresh_payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=ALGORITHM)
#
#
#
#         return func(request, *args, **kwargs)
#
#     return wrapper


# def validate_access_token(user, SECRET_KEY, ALGORITHM):
def login_check(request):
    try:
        access_token = request.headers.get('Authorization', None)
        refresh_token = request.data['refreshtoken']
        access_payload = jwt.decode(access_token, SECRET_KEY, algorithms=ALGORITHM)
        finduser = user.objects.get(name=access_payload['name'])
        if finduser:
            return 1
        else:
            return False
    except jwt.exceptions.ExpiredSignatureError or jwt.exceptions.DecodeError:
        refresh_payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=ALGORITHM)
        user2 = user.objects.filter(name=refresh_payload['name']).first()
        return generate_access_token(user2, SECRET_KEY, ALGORITHM)

def generate_access_token(user, SECRET_KEY, ALGORITHM):
    return jwt.encode({'name': user.name, 'alias': user.alias, 'email': user.email, 'save_img': user.save_img,
                       'exp': datetime.utcnow() + timedelta(seconds=40)}, SECRET_KEY, ALGORITHM).decode('utf-8')

def generate_refresh_token(user, SECRET_KEY, ALGORITHM):
    return jwt.encode({'name': user.name, 'alias': user.alias, 'email': user.email, 'save_img': user.save_img,
                       'exp': datetime.utcnow() + timedelta(days=7)}, SECRET_KEY, ALGORITHM).decode('utf-8')



# accesstoken 재발급
def validateTokens(access_payload, refresh_payload):
    acc = user.objects.get(name=access_payload['name'])
    ref = user.objects.get(name=refresh_payload['name'])
    if (acc is None) and ref:
        newAccessToken = generate_access_token(ref, SECRET_KEY, ALGORITHM)
    else:
        newAccessToken = None
    return newAccessToken





#
def user_change_alias(user, alias):
    if user and alias:
        if user_find_by_alias(alias):  # 해당 alias를 가진 user가 있으면
            return False
        user.alias = alias
        user.save()
        return True
    return False


#
def user_change_pw(user, pw):
    if user and pw:
        hash_pw, salt = user_hash_pw(pw)
        user.pw = hash_pw
        user.salt = salt
        user.save()
        return True
    return False


# Password Hashing
def user_hash_pw(pw):
    pw = str(pw).encode('utf-8')
    salt = bcrypt.gensalt()
    hash_pw = bcrypt.hashpw(pw, salt)
    return hash_pw, salt


#
def user_create_client(name, email, pw, alias):
    if user_find_by_name(name):
        return 1
    if user_find_by_alias(alias):
        return 2
    if user_find_by_email(email):
        return 3
    hash_pw, salt = user_hash_pw(pw)
    return user.objects.create(name=name, alias=alias, pw=hash_pw, salt=salt, email=email)
    # return user.objects.all()


#
def user_find_by_name(name):
    qs = user.objects.all()
    return qs.filter(name=name)


def user_find_by_id(id):
    return user.objects.all().filter(id=id)


def user_find_by_email(email):
    return user.objects.all().filter(email=email)


#
def user_find_by_alias(alias):
    return user.objects.all().filter(alias=alias)


#
def user_user_search_by_name(name):
    qs = user.objects.all()
    return qs.filter(name__icontains=name)


#
def user_user_search_by_alias(alias):
    qs = user.objects.all()
    result = qs.filter(alias__icontains=alias)
    return result


#
def user_compPW(pw, user):
    pw = str(pw).encode('utf-8')
    salt = user.salt
    hash_pw = bcrypt.hashpw(pw, salt)
    return hash_pw == user.pw
