from .utils import get_ai_result
from __future__ import absolute_import, unicode_literals

 
@celery.task
def ai_task(request):
    return get_ai_result(request)