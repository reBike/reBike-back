from django.db import models

# 쓰레기 종류
class TrashKinds(models.Model):
    trash_kind=models.CharField(max_length=30, primary_key=True)
    trash_way=models.CharField(max_length=200)

# 유저데이터
class User(models.Model):
    user_id=models.CharField(max_length=30, primary_key=True)
    user_pw=models.CharField(max_length=30)
    user_alias=models.CharField(max_length=30)
    user_pw_hash=models.CharField(max_length=50)

# 쓰레기 이미지 모음
class UploadedImg(models.Model):
    trash_kind=models.ForeignKey(TrashKinds, on_delete=models.CASCADE)
    trash_id=models.ForeignKey(User, on_delete=models.CASCADE)
    trash_img=models.ImageField(max_length=200)
    img_upload_date=models.DateTimeField(max_length=30)
    img_upload_time=models.DateTimeField(max_length=30)
