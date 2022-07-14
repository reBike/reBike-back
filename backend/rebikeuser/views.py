from django.http import HttpResponse
from .models import user


def on_login(request):
    qs = user.objects.all()
    username = request.GET.get('username', '')
    if username:
        qs = qs.filter(user_name=username)
    return HttpResponse(qs)
