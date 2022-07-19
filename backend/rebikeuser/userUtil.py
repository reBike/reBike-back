import uuid
import bcrypt

from .models import user
from django.http import HttpResponse


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
    qs = user.objects.all()
    return qs.filter(alias=alias)


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
