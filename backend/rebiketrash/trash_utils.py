import boto3
import time
from backend.settings import KEY_ID, SECRET_KEY, BUCKET_NAME
from .models import trash


def trash_image_upload_s3(uploaded_image):
    s3_client = boto3.client('s3', aws_access_key_id=KEY_ID, aws_secret_access_key=SECRET_KEY)
    key = str(int(time.time()))
    s3_client.upload_fileobj(uploaded_image, BUCKET_NAME, key,
                             ExtraArgs={"ContentType": uploaded_image.content_type})
    image_url = 'https://' + BUCKET_NAME + '.s3.ap-northeast-2.amazonaws.com/' + key
    return image_url


def trash_find_by_id(trash_id):
    result = trash.objects.filter(owner_uuid=trash_id)
    return result


def trash_find_by_owner_id(user_data):
    result = trash.objects.filter(owner_uuid=user_data)
    return result


def trash_create(is_on_basket, img_url, owner_uuid, trash_kind):
    return trash.objects.create(is_on_basket=is_on_basket, img=img_url, owner_uuid=owner_uuid, trash_kind=trash_kind)
