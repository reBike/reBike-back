import uuid
import bcrypt
import jwt

from .JWT_Settings import ALGORITHM, SECRET_KEY, jWT_EXPIRATION_DELTA
from .models import user
from django.http import HttpResponse, JsonResponse
from datetime import datetime, timedelta


# 로그인 인증 데코레이터 필요한 경우 @login_check으로 실행
def login_check(func):
    def wrapper(request, *args, **kwargs):
        try:
            access_token = request.headers.get('Authorization', None)
            payload = jwt.decode(access_token, SECRET_KEY, algorithms=ALGORITHM)
            user_name = user.objects.get(name=payload['name'])
            request.user = user_name
        except jwt.exceptions.DecodeError:
            return JsonResponse({'message': 'INVALID TOKEN'}, status=400)
        except user.DoesNotExist:
            return JsonResponse({'message': 'INVALID USER'}, status=400)
        except jwt.exceptions.ExpiredSignatureError:
            return JsonResponse({'message': 'INVALID TOKEN'}, status=400)
        return func(request, *args, **kwargs)

    return wrapper


def generate_access_token(user, SECRET_KEY, ALGORITHM):
    return jwt.encode({'name': user.name, 'exp': datetime.utcnow() + timedelta(seconds=1200)}, SECRET_KEY, ALGORITHM)


# def login_check(func):

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
