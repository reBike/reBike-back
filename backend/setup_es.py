import os
import json

import elasticsearch.exceptions
from elasticsearch_dsl import connections

try:
    conn = connections.create_connection(hosts=['elasticsearch:9200'], timeout=20)
    search_path = os.getcwd()

    with open(search_path + "/search_config.json", encoding='utf-8') as json_file:
        json_data = json.loads(json_file.read())
        num = 0
        index = {"_index": "index_name", "_type": "doc"}
        body = ""

    for item in json_data:
        body = body + json.dumps({"index": {"_index": "search_2"}}) + '\n'
        body = body + json.dumps(item, ensure_ascii=False) + '\n'
        try:
            conn.bulk(body)
            print(body)
        except elasticsearch.exceptions.ConnectionError:
            print("fail to bulk !!!!!!!!!")

except elasticsearch.exceptions.ConnectionError:
    print("fail to make connections")
