# Generated by Django 2.2.1 on 2019-12-11 22:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommaria_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='imageUrl',
            field=models.URLField(default='none'),
            preserve_default=False,
        ),
    ]
