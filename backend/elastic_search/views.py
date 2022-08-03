from rest_framework.decorators import api_view
from django.http import JsonResponse

from elasticsearch_dsl import Search, connections
from elasticsearch_dsl.query import Match


@api_view(['GET', 'POST'])
def search_api(request):
    if request.method == 'GET':
        return elastic_search_get_by_name(request)
    if request.method == 'POST':
        return elastic_search_post_by_name(request)


def elastic_search_get_by_name(request):
    search_value = request.GET.get('value')
    try:
        conn = connections.create_connection(hosts=['elasticsearch'], timeout=20)
        s = Search().using(conn).filter('terms', tags=[search_value])
        return_result = []
        for hit in s:
            return_result.append(hit.key)
    except ConnectionError:
        return JsonResponse({'result': "fail"}, status=400)
    return JsonResponse({'result': return_result}, status=200)


def elastic_search_post_by_name(request):
    search_value = request.data['value']
    try:
        conn = connections.create_connection(hosts=['elasticsearch'], timeout=20)
        s = Search().using(conn).query("match", key=search_value)
        return_result = []
        for hit in s:
            return_result.append(hit.value)
    except ConnectionError:
        return JsonResponse({'result': "fail"}, status=400)
    return JsonResponse({'result': return_result}, status=200)
