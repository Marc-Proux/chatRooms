# Generated by Django 4.1 on 2023-01-09 12:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chatRoom', '0006_alter_user_friends'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='Accounts',
        ),
    ]
