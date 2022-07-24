import boto3
import time
from backend.backend.settings import AWS_ACCESS_KEY_ID , AWS_SECRET_ACCESS_KEY


def image_upload_s3(uploaded_image, user_name):
    s3_client = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
    key = user_name + str(int(time.time()))
    s3_client.upload_fileobj(uploaded_image, 'ryokumantest', key)
    image_url = "https://ryokumantest.s3.ap-northeast-2.amazonaws.com/" + key
    return image_url