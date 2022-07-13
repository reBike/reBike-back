from email.policy import default
from django.shortcuts import render,HttpResponse

from backend.settings import DEFAULT_AUTO_FIELD
from .models import Trashkinds, Uploadedtrash
from rebikeuser.models import User

TrashKinds = {}
UploadedTrashs = {}

# Create your views here.
def mypage(request):
    UploadedTrashs = Uploadedtrash.objects.all()
    UploadedTrash = request.GET.get('username', '')
    if UploadedTrash:
        UploadedTrashs = UploadedTrashs.filter(upload_user=UploadedTrash)
    return HttpResponse(UploadedTrashs)

def mainpage(request, userId, uploadImg, aiResult):
    return HttpResponse()