import bcrypt
import jwt

from .JWT_Settings import ALGORITHM, SECRET_KEY
from .models import user
from django.http import JsonResponse
from datetime import datetime, timedelta


def accesss_token_reissuance(refresh_token):
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=ALGORITHM)
        user_data = user.objects.get(name=payload['name']).first()
        access_token = generate_access_token(user_data, SECRET_KEY, ALGORITHM)
    except jwt.exceptions.DecodeError:
        return 'DECODE FAIL'
    except user.DoesNotExist:
        return 'INVALID USER'
    except jwt.exceptions.ExpiredSignatureError:
        return 'EXPIRED TOKEN'
    return access_token


# 로그인 인증 데코레이터 필요한 경우 @access_token_check으로 실행
def access_token_check(func):
    def wrapper(request, *args, **kwargs):
        try:
            access_token = request.headers.get('Authorization', None)
            payload = jwt.decode(access_token, SECRET_KEY, algorithms=ALGORITHM)
            user_name = user.objects.get(name=payload['name'])
            request.user = user_name
        except jwt.exceptions.DecodeError:
            return JsonResponse({'message': 'DECODE FAIL'}, status=400)
        except user.DoesNotExist:
            return JsonResponse({'message': 'INVALID USER'}, status=400)
        except jwt.exceptions.ExpiredSignatureError:
            return JsonResponse({'message': 'EXPIRED TOKEN'}, status=400)
        return func(request, *args, **kwargs)

    return wrapper


def generate_access_token(user, key, algorithm):
    return jwt.encode({'name': user.name, 'exp': datetime.utcnow() + timedelta(minutes=30)}, key, algorithm)


def generate_refresh_token(user, key, algorithm):
    return jwt.encode({'name': user.name, 'exp': datetime.utcnow() + timedelta(days=14)}, key, algorithm)


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
