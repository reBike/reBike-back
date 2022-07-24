from django.http import JsonResponse
from rest_framework.decorators import api_view

from .utils import image_upload_s3


@api_view(['GET', 'POST', 'PATCH'])
def images(request):
    if request.method == 'GET':
        image_find(request)
    if request.method == 'POST':
        return image_upload(request)


def image_upload(request):
    uploaded_image = request.FILES['image']
    url = image_upload_s3(uploaded_image, "hello")
    return JsonResponse({"message": url}, status=200)

def image_find(reqeust):


