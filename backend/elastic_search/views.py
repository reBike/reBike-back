from rest_framework.decorators import api_view
from django.http import JsonResponse

from elasticsearch_dsl import Search, connections


@api_view(['GET'])
def elastic_search_get_by_name(request):
    search_value = request.GET.get('value')
    try:
        conn = connections.create_connection(hosts=['elasticsearch'], timeout=20)
        s = Search().using(conn).query("match", key=search_value)
        return_result = []
        for hit in s:
            return_result.append(hit.value)
    except ConnectionError:
        return JsonResponse({'result': "fail"}, status=400)
    return JsonResponse({'result': return_result}, status=200)
