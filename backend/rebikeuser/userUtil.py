import uuid
import bcrypt
import jwt

from .JWT_Settings import ALGORITHM, SECRET_KEY
from .models import user
from datetime import datetime, timedelta


def user_token_to_data(token):
    try:
        payload = jwt.decode(token)
    except jwt.exceptions.ExpiredSignatureError or jwt.exceptions.DecodeError:
        return False
    return payload


def user_refresh_to_access(refresh_token):
    try:
        payload = jwt.decode(refresh_token)
        access_token = user_generate_access_token(payload)
    except jwt.exceptions.ExpiredSignatureError or jwt.exceptions.DecodeError:
        return False
    return access_token


def user_generate_access_token(user):
    return jwt.encode({'name': user.name, 'alias': user.alias, 'email': user.email,
                       'exp': datetime.utcnow() + timedelta(seconds=40)}, SECRET_KEY, ALGORITHM).decode('utf-8')


def user_generate_refresh_token(user):
    return jwt.encode({'name': user.name, 'alias': user.alias, 'email': user.email,
                       'exp': datetime.utcnow() + timedelta(days=7)}, SECRET_KEY, ALGORITHM).decode('utf-8')


def user_change_alias(user, alias):
    if user and alias:
        if user_find_by_alias(alias):
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


class user_duplicate_check:
    @staticmethod
    def alias(alias):
        if user_find_by_alias(alias):
            return False
        return True

    @staticmethod
    def email(email):
        if user_find_by_alias(email):
            return False
        return True

    @staticmethod
    def name(name):
        if user_find_by_alias(name):
            return False
        return True


def user_create_client(name, email, pw, alias):
    if user_find_by_name(name):
        return 1
    if user_find_by_alias(alias):
        return 2
    if user_find_by_email(email):
        return 3
    hash_pw, salt = user_hash_pw(pw)
    return user.objects.create(name=name, alias=alias, pw=hash_pw, salt=salt, email=email)


def user_find_by_name(name):
    qs = user.objects.all()
    return qs.filter(name=name)


def user_find_by_alias(alias):
    return user.objects.all().filter(alias=alias)


def user_find_by_id(id):
    return user.objects.all().filter(id=id)


def user_find_by_email(email):
    return user.objects.all().filter(email=email)


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
    hash_pw = bcrypt.hashpw(pw, user.salt)
    return hash_pw == user.pw


def user_deactivate(pw, user):
    if user and user_compPW(pw, user):
        user.active = False
        user.save()
    else:
        return False


def user_set_autosave2(user):
    user.save_img = not user.save_img
    user.save()
