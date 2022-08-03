from datetime import datetime, timedelta

import bcrypt
import jwt

from .JWT_Settings import ALGORITHM, SECRET_KEY
from .models import user
from .serializers import UserSerializer


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
            {'id': payload.get('id'), 'name': payload.get('name'), 'alias': payload.get('alias'),
             'email': payload.get('email'), 'type': "access_token",
             'exp': datetime.utcnow() + timedelta(minutes=5)}, SECRET_KEY, ALGORITHM).decode('utf-8')
    except jwt.exceptions.ExpiredSignatureError or jwt.exceptions.DecodeError:
        return False
    return access_token


def user_generate_access_token(user_data):
    return jwt.encode(
        {'id': str(user_data.id), 'alias': user_data.alias, 'exp': datetime.utcnow() + timedelta(minutes=30),
         'type': 'access_token'},
        SECRET_KEY, ALGORITHM).decode('utf-8')


def user_generate_refresh_token(user_data):
    return jwt.encode({'id': str(user_data.id), 'alias': user_data.alias, 'exp': datetime.utcnow() + timedelta(days=7),
                       'type': "refresh_token"},
                      SECRET_KEY, ALGORITHM).decode('utf-8')


# Password Hashing
def user_hash_password(password):
    password = str(password).encode('utf-8')
    salt = bcrypt.gensalt()
    hash_password = bcrypt.hashpw(password, salt)
    return hash_password, salt


class UserDuplicateCheck:
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


def user_change_value(value, alias):
    user_data = user_find_by_alias(alias).first()

    if value.get('password'):
        hash_password, salt = user_hash_password(value.get('password'))
        user_data.password = hash_password
        user_data.salt = salt
        # value.update({"password": hash_password, "salt": salt})
    elif value.get('alias'):
        user_data.alias = value.get('alias')
    user_data.save()
    return user_data


def user_find_by_id(user_id):
    return user.objects.filter(id=user_id)


def user_find_by_name(name):
    return user.objects.filter(name=name)


def user_find_by_alias(alias):
    return user.objects.filter(alias=alias)


def user_find_by_email(email):
    return user.objects.filter(email=email)


def user_create_client(name, email, password, alias):
    hash_password, salt = user_hash_password(password)
    return user.objects.create(name=name, alias=alias, password=hash_password, salt=salt, email=email)

def user_comppassword(password, user_data):
    password = str(password).encode('utf-8')
    hash_password = bcrypt.hashpw(password, user_data.salt)
    return hash_password == user_data.password