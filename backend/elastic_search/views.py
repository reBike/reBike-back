from rest_framework.decorators import api_view
from django.http import JsonResponse
from .models import Category
from .documents import CategoryDocument


@api_view(['GET', 'POST'])
def elastic_search(request):
    if request.method == 'GET':
        return elastic_search_get(request)
    if request.method == 'POST':
        return elastic_search_post(request)


def elastic_search_get(request):
    search_value = request.GET.get('value')
    search_result = CategoryDocument.search().filter("term", name=search_value)
    return_result = []
    num = 1
    for hit in search_result:
        return_result.append(dict({'number': num, 'name': hit.name, 'desc': hit.desc}))
    return JsonResponse({'result': return_result}, status=200)


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
