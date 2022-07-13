from distutils.command.upload import upload
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


class Trashkinds(models.Model):
    trash_kind = models.CharField(primary_key=True, max_length=30)
    trash_throw_way = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'TrashKinds'


class Uploadedtrash(models.Model):
    upload_id = models.AutoField(primary_key=True)
    upload_img = models.CharField(max_length=200)
    upload_date = models.DateTimeField()
    upload_user = models.ForeignKey(User, on_delete=models.CASCADE, db_column='upload_user')
    upload_trash_kind = models.ForeignKey(Trashkinds, on_delete=models.CASCADE, db_column='upload_trash_kind')

    class Meta:
        managed = False
        db_table = 'UploadedTrash'
