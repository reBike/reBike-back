from datetime import datetime, timedelta

import bcrypt
import jwt

from .JWT_Settings import ALGORITHM, SECRET_KEY
from .models import user


def user_token_to_data(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
    except jwt.exceptions.ExpiredSignatureError:
        return "Expired_Token"
    except jwt.exceptions.DecodeError:
        return "Invalid_Token"
    return payload


def user_refresh_to_access(refresh_token):
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=ALGORITHM)
        access_token = jwt.encode(
            {'name': payload.get('name'), 'alias': payload.get('alias'), 'email': payload.get('email'),
             'exp': datetime.utcnow() + timedelta(minutes=5)}, SECRET_KEY, ALGORITHM).decode('utf-8')
    except jwt.exceptions.ExpiredSignatureError or jwt.exceptions.DecodeError:
        return False
    return access_token


def user_generate_access_token(user):
    return jwt.encode({'name': user.name, 'alias': user.alias, 'email': user.email,
                       'exp': datetime.utcnow() + timedelta(hours=5), 'type': 'access_token'}, SECRET_KEY,
                      ALGORITHM).decode('utf-8')


def user_generate_refresh_token(user):
    return jwt.encode({'name': user.name, 'alias': user.alias, 'email': user.email,
                       'exp': datetime.utcnow() + timedelta(days=7), 'type': "refresh_token"}, SECRET_KEY,
                      ALGORITHM).decode('utf-8')


# Password Hashing
def user_hash_pw(pw):
    pw = str(pw).encode('utf-8')
    salt = bcrypt.gensalt()
    hash_pw = bcrypt.hashpw(pw, salt)
    return hash_pw, salt


class UserDuplicateCheck():
    @staticmethod
    def alias(alias):
        if user_find_by_alias(alias):
            return False
        return True

    @staticmethod
    def email(email):
        if user_find_by_email(email):
            return False
        return True

    @staticmethod
    def name(name):
        if user_find_by_name(name):
            return False
        return True


def user_change_value(value):
    find_user = user_find_by_name(value.get('name'))
    if value.get('pw'):
        hash_pw, salt = user_hash_pw(value.get('pw'))
        value.update({"pw": hash_pw, "salt": salt})
    find_user.update(**value)
    return True


def user_find_by_name(name):
    return user.objects.filter(name=name)


def user_find_by_alias(alias):
    return user.objects.filter(alias=alias)


def user_find_by_email(email):
    return user.objects.filter(email=email)


def user_create_client(name, email, pw, alias):
    hash_pw, salt = user_hash_pw(pw)
    return user.objects.create(name=name, alias=alias, pw=hash_pw, salt=salt, email=email)


def user_compPW(pw, user):
    pw = str(pw).encode('utf-8')
    hash_pw = bcrypt.hashpw(pw, user.salt)
    return hash_pw == user.pw
