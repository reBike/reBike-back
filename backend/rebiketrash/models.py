from django.db import models
from rebikeuser.models import user 


class trash_kind(models.Model):
    kind = models.CharField(primary_key=True, max_length=30)
    way = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now_add=True, blank=True)

    class Meta:
        managed = False
        db_table = 'trash_kind'


class uploaded_trash_image(models.Model):
    uploaded_trash_image_id = models.AutoField(primary_key=True)
    active = models.IntegerField(default=1)
    img = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now_add=True, blank=True)
    user_id = models.ForeignKey(user, on_delete=models.CASCADE, db_column='user_id')
    trash_kind = models.ForeignKey(trash_kind, on_delete=models.CASCADE, db_column='trash_kind')

    class Meta:
        managed = False
        db_table = 'uploaded_trash_image'

