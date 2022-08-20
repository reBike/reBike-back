from __future__ import absolute_import, unicode_literals
from was.celery import app
from .utils import get_ai_result
from django.http import JsonResponse

@app.task
def ai_task(request):
    r = get_ai_result(request)
    if r["ai_results"] == 0:
        return {"ai_results":0, "image_url":0}
    return {"ai_results":r["ai_results"], "image_url":r["image_url"]}

