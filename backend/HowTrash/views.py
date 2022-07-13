from django.shortcuts import render, HttpResponse
from .models import Trashkinds
# Create your views here.

def index(request):
    infos = Trashkinds.objects.all()[0]
    article = f'''
    <html>
    <body>
        <h2>HowTrash</h2>
        {infos}
    </body>
    </html>
    '''
    return HttpResponse(article)