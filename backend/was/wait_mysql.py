import pymysql
from time import time, sleep
import logging


def mysql_is_ready():
    check_timeout = 30
    check_interval = 1

    start_time = time()
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    logger.addHandler(logging.StreamHandler())

    port = 3306
    host = 'mysqldb'

    while time() - start_time < check_timeout:
        try:
            pymysql.connect(host=host, port=port, user='root', passwd='root', db='test')
            print("success")
            return True
        except pymysql.err.OperationalError:
            sleep(check_interval)
    logger.error(f"We could not connect to {host}:{port} within {check_timeout} seconds.")
    return False


mysql_is_ready()