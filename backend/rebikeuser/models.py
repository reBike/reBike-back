from django.db import models
import uuid

class user(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4().bytes, editable=False)
    name = models.CharField(unique=True, max_length=20)
    alias = models.CharField(unique=True, max_length=20)
    pw = models.BinaryField(max_length=60)
    salt = models.BinaryField(max_length=29)
    email = models.CharField(unique=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'user'