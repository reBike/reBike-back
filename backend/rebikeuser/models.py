from django.db import models


class User(models.Model):
    id = models.AutoField(primary_key=True)
    user_name = models.CharField(unique=True, max_length=20)
    user_alias = models.CharField(unique=True, max_length=20)
    user_email = models.CharField(unique=True, max_length=50)
    user_pw = models.CharField(max_length=60)
    user_salt = models.BinaryField(max_length=29)

    def __str__(self):
        return self.user_name

    class Meta:
        managed = False
        db_table = 'User'
