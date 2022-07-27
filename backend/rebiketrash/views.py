from django.http import JsonResponse
from rest_framework.decorators import api_view

from rebikeuser.user_utils import user_find_by_alias, user_token_to_data

from .trash_utils import trash_image_upload_s3, trash_find_by_owner_id, trash_create, trash_find_by_id
from .serializers import TrashFindResponse


@api_view(['GET', 'POST', 'PATCH'])
def trash(request):
    if request.method == 'GET':
        return trash_find(request)
    if request.method == 'POST':
        return trash_upload(request)
    if request.method == 'PATCH':
        return trash_to_basket(request)


def trash_upload(request):
    token = request.headers.get('Authorization', None)
    payload = user_token_to_data(token)
    if type(payload) != str:
        uploaded_image = request.FILES['image']
        image_url = trash_image_upload_s3(uploaded_image)
        user_data = user_find_by_alias(payload.get('alias')).first()
        trash_kind = 'plastic'
        trash_create(user_data.save_img, image_url, user_data, trash_kind)
        return JsonResponse({"message": trash_kind}, status=200)
    else:
        return JsonResponse({'message': payload}, status=401)


# 아마 array 부분 문제 생길 것 같음
def trash_find(request):
    token = request.headers.get('Authorization', None)
    payload = user_token_to_data(token)
    if type(payload) != str:
        trash_list = TrashFindResponse(trash_find_by_owner_id(payload.get('id')), many=True).data
        result = []
        for item in trash_list:
            result.append(dict(item))
        return JsonResponse({'message': result}, status=200)
    else:
        return JsonResponse({'message': payload}, status=401)


def trash_to_basket(request):
    trash_id = request.data['trash_id']
    token = request.headers.get('Authorization', None)
    payload = user_token_to_data(token)
    if payload != str:
        trash_data = trash_find_by_id(trash_id).first()
        result = not trash_data.is_on_basket
        new_value = {'is_on_basket': result}
        trash_find_by_id(trash_id).update(**new_value)
        return JsonResponse({'message': 'success'}, status=200)
    else:
        return JsonResponse({'message': payload}, status=401)
