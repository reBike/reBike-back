import bcrypt
from .models import User


def user_findByName(name):
    qs = User.objects.all()
    qs.filter(user_name=name)
    return qs


def user_searchByAlias(alias):
    qs = User.objects.all()
    qs.filter(user_alias=alias)
    return qs


def user_searchByName(name):
    qs = User.objects.all()
    qs.filter(user_name__icontains=name)
    return qs


def user_findByAlias(alias):
    qs = User.objects.all()
    qs.filter(user_alias__icontains=alias)
    return qs



def user_compPW(pw, user):
    pw = pw.encode('utf-8')
    salt = user.user_salt
    hash_pw = bcrypt.hashpw(pw, salt)
    return hash_pw == user.user_pw
