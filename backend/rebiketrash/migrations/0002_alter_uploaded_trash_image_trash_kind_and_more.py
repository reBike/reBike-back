# Generated by Django 4.0.6 on 2022-07-28 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rebiketrash', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='uploaded_trash_image',
            name='trash_kind',
            field=models.CharField(max_length=30),
        ),
        migrations.DeleteModel(
            name='trash_kind',
        ),
    ]