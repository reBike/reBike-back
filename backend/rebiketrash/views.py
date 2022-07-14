from audioop import reverse
from django.shortcuts import render, HttpResponse
from django.db.models import Count

from .models import trash_kind, uploaded_trash_image
from rebikeuser.models import user

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .serializers import TrashkindSerializer, UploadedtrashimageSerializer

# Create your views here.
class TrashkindListAPI(APIView):
    def get(self, request):
        queryset = trash_kind.objects.all()
        print(queryset)
        serializer = TrashkindSerializer(queryset, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def histories(request,user_id):
    uploadedTrashs = uploaded_trash_image.objects.filter(user_id=int(user_id))
    serializer = UploadedtrashimageSerializer(uploadedTrashs, many=True)
    return Response(serializer.data)

class UploadedtrashimageListAPI(APIView):
    def get(self, request, user_id, uploaded_image_id):
        uploadedTrashs = uploaded_trash_image.objects.filter(user_id=int(user_id))
        objs = uploadedTrashs.filter(upload_id = int(uploaded_image_id))
        serializer = UploadedtrashimageSerializer(objs, many=True)
        return Response(serializer.data)

    def delete(self, request, user_id, uploaded_image_id):
        if user_id == 'anonymous':
            return HttpResponse('anonymous')
        uploadedTrashs = uploaded_trash_image.objects.filter(user_id=int(user_id))
        objs = uploadedTrashs.filter(upload_id = int(uploaded_image_id))
        objs.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 

@api_view(['GET'])
def statistics(request,user_id):
    uploadedTrashs = uploaded_trash_image.objects.filter(user_id=int(user_id))
    categories = uploadedTrashs.objects.values('trash_kind', number_of_trash_kind=Count('trash_kind'))
    #serializer = UploadedtrashimageSerializer(categories, many=True)
    #return Response(serializer.data)

    return HttpResponse(categories)