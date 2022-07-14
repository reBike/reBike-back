from django.db import models

class user(models.Model):
    id = models.BinaryField(max_length=16, primary_key=True)
    name = models.CharField(unique=True, max_length=20)
    alias = models.CharField(unique=True, max_length=20)
    pw = models.BinaryField(max_length=60)
    salt = models.BinaryField(max_length=29)
    email = models.CharField(unique=True, max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'user'
