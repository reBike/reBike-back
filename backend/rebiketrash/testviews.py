from django.http import JsonResponse
from rest_framework.decorators import api_view

from .trash_utils import image_upload_s3
from backend.rebikeuser.user_utils import user_find_by_alias


@api_view(['GET', 'POST', 'PATCH'])
def images(request):
    if request.method == 'GET':
        trash_find(request)
    if request.method == 'POST':
        return trash_upload(request)
    if request.method == 'PATCH':
        return trash_to_basket(request)


def trash_upload(request):
    uploaded_image = request.FILES['image']
    url = image_upload_s3(uploaded_image, "hello")
    return JsonResponse({"message": url}, status=200)


def trash_find(reqeust):
    user_alias = reqeust.GET.get('alias')


def trash_to_basket(request):
    user_alias = request.data['alias']
    user_data = user_find_by_alias(user_alias)
    user_data.update()

