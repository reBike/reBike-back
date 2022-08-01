from __future__ import absolute_import, unicode_literals
from backend.celery import app

@app.task
def ai_task(img):
    return 0