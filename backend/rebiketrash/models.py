from django.db import models
from rebikeuser.models import user


class trash(models.Model):
    trash_id = models.AutoField(primary_key=True)
    is_on_basket = models.BooleanField(default=False)
    img = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)
    owner_uuid = models.ForeignKey(user, on_delete=models.CASCADE, db_column='user_id')
    trash_kind = models.CharField(max_length=20)

    class Meta:
        db_table = 'trash'
