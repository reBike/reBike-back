from django.db import models
from rebikeuser.models import user

class challenge(models.Model):
    number = models.AutoField(primary_key=True)
    content = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)

    class Meta:
        db_table = 'challenge'


class user_challenge(models.Model):
    user_id = models.ForeignKey(user, on_delete=models.CASCADE, db_column='user_id')
    challenge_number = models.ForeignKey(challenge, on_delete=models.CASCADE, db_column='challenge_number')
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)

    class Meta:
        db_table = 'user_challenge'
