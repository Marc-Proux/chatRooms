# Generated by Django 4.1 on 2023-01-09 11:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chatRoom', '0002_remove_user_email_remove_user_password_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='messages',
        ),
        migrations.AddField(
            model_name='message',
            name='room',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='chatRoom.room'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
