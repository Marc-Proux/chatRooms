# Generated by Django 4.1 on 2023-01-09 11:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chatRoom', '0003_remove_room_messages_message_room_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='friends',
            field=models.ManyToManyField(blank=True, null=True, to='chatRoom.user'),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
