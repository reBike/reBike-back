from __future__ import absolute_import, unicode_literals
from .utils import set_ai_model
from celery import shared_task
from backend.celery import app


@app.task
def ai_task(img):
    return set_ai_model(img)