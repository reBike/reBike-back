from django.db import models


class User(models.Model):
    id = models.AutoField(primary_key=True)
    user_name = models.CharField(unique=True, max_length=20)
    user_alias = models.CharField(unique=True, max_length=20)
    user_pw = models.CharField(max_length=64)
    user_email = models.CharField(unique=True, max_length=50)

    def __str__(self):
        return self.user_name

    class Meta:
        managed = False
        db_table = 'User'
