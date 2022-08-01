from rest_framework.decorators import api_view
from django.http import JsonResponse
from elasticsearch_dsl import Search
from elasticsearch import Elasticsearch

from .models import Category
from .documents import CategoryDocument

client = Elasticsearch()


@api_view(['GET'])
def elastic_search_get_by_name(request):
    search_value = request.GET.get('value')
    search_result = CategoryDocument.search().filter("term", name=search_value)
    return_result = []
    num = 1
    for hit in search_result:
        return_result.append(dict({'number': num, 'name': hit.name, 'desc': hit.desc}))
    return JsonResponse({'result': return_result}, status=200)


@api_view(['POST'])
def elastic_search_post(request):
    name = request.data['name']
    desc = request.data['desc']
    category = Category(
        name=name,
        desc=desc
    )
    check_name = category.name
    check_desc = category.desc
    category.save()
    return JsonResponse({'check_name': check_name, 'check_desc': check_desc, 'name': name, 'desc': "desc"},
                        status=201)


@api_view(['GET'])
def elastic_search_get_by_desc(request):
    search_value = request.GET.get('value')
    search_result = Search().using(client).query("match", desc=search_value)
    return_result = []
    num = 1
    for hit in search_result:
        return_result.append(dict({'number': num, 'name': hit.name, 'desc': hit.desc}))
    return JsonResponse({'result': return_result}, status=200)
