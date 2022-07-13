from django.http import HttpResponse
from .models import User


def on_login(request):
    qs = User.objects.all()
    username = request.GET.get('username', '')
    if username:
        qs = qs.filter(user_name=username)
    return HttpResponse(qs)
