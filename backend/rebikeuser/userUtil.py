import bcrypt
from .models import User


def user_hash_pw(pw):
    pw = pw.encode('utf-8')
    salt = bcrypt.gensalt()
    hash_pw = bcrypt.hashpw(pw, salt)
    return hash_pw, salt


def user_createModel(user_id, email, pw, alias):
    if User.get.all().filter('user.user_name' == user_id) and User.get.all().filter('user.user_alias' == alias):
        return
    hash_pw, salt = user_hash_pw(pw)
    user = User.objects.create_user(user_id, email, hash_pw)
    user.user_alias = alias
    user.user_salt = salt
    user.save()


def user_findByName(name):
    qs = User.objects.all()
    result = qs.filter(user_name=name)
    return result


def user_searchByAlias(alias):
    qs = User.objects.all()
    result = qs.filter(user_alias=alias)
    return result


def user_searchByName(name):
    qs = User.objects.all()
    result = qs.filter(user_name__icontains=name)
    return result


def user_findByAlias(alias):
    qs = User.objects.all()
    result = qs.filter(user_alias__icontains=alias)
    return result


def user_compPW(pw, user):
    pw = pw.encode('utf-8')
    salt = bcrypt.gensalt()
    hash_pw = bcrypt.hashpw(pw, salt)
    return hash_pw == user.user_pw

def user_change_pw(user, pw):
    result = False
    if user and pw:
        hash_pw, salt = user_hash_pw(pw)
        user.user_pw = hash_pw
        user.user_salt = salt
        user.save()
        result = True
    return result

def user_change_alias(user, alias):
    result = False
    if user and alias:
        if user_findByAlias(alias) == '':
            user.user_alias = alias
            user.save()
            result = True
    return result
