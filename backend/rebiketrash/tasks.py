from __future__ import absolute_import, unicode_literals
from backend.celery import app
from .utils import get_ai_result
from django.http import JsonResponse

@app.task
def ai_task(request):
    r = get_ai_result(request)
    # db에 결과 저장 status
    return {"ai_results":r["ai_results"], "image_url":r["image_url"]}