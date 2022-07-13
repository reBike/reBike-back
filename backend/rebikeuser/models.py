from django.db import models


class User(models.Model):
    id = models.AutoField(primary_key=True)
    user_name = models.CharField(unique=True, max_length=20)
    user_alias = models.CharField(unique=True, max_length=20)
    user_pw = models.CharField(max_length=64)
    user_email = models.CharField(unique=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'User'
