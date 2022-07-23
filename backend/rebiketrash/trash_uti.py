from urllib import response
from django.shortcuts import render, HttpResponse
from django.db.models import Count

from .models import trash_kind, uploaded_trash_image, challenge, user_challenge
from rebikeuser.models import user

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from .serializers import TrashKindSerializer, UploadedTrashImageSerializer, UploadedTrashImageDetailSerializer, \
    UploadedTrashImageStatisticsSerializer, ChallengeSerializer, UserChallengeSerializer

import boto3
from datetime import datetime, timedelta
from backend.settings import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

import torch
import os


def trash_upload_image(image):
    s3_client = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
    s3_client.upload_fileobj( image,
        "image-bucket2",
        image_time + "." + image_type,
        ExtraArgs={
            "ContentType": image.content_type
        }
    )


def get_img_url(request):
    image = request.FILES['filename']
    image_time = (str(datetime.now())).replace(" ", "")
    image_type = (image.content_type).split("/")[1]

    image_url = "http://image-bucket2.s3.ap-northeast-2.amazonaws.com/" + \
                image_time + "." + image_type
    image_url = image_url.replace(" ", "/")
    return image_url
