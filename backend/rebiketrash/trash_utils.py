import boto3
import uuid
from backend.settings import KEY_ID, ACCESS_KEY, BUCKET_NAME
from .models import trash


def trash_image_upload_s3(uploaded_image):
    s3_client = boto3.client('s3', aws_access_key_id=KEY_ID, aws_secret_access_key=ACCESS_KEY)
    key = str(uuid.uuid4())
    s3_client.upload_fileobj(uploaded_image, BUCKET_NAME, key)
    image_url = 'https://' + BUCKET_NAME + '.s3.ap-northeast-2.amazonaws.com/' + key
    return image_url


def trash_find_by_id(trash_id):
    result = trash.objects.filter(trash_id=trash_id)
    return result


def trash_find_by_owner_id(user_data):
    result = trash.objects.filter(owner=user_data)
    return result


def trash_create(is_on_basket, img_url, owner, trash_kind):
    return trash.objects.create(is_on_basket=is_on_basket, img=img_url, owner=owner, trash_kind=trash_kind)
