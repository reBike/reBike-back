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
        f = open(search_path + 'input3.json', 'w')
        f.write(body)
        f.close()
except elasticsearch.exceptions.ConnectionError:
    print("fail1")

try:
    conn.bulk(body)
except elasticsearch.exceptions.ConnectionError:
    print("fail2")
