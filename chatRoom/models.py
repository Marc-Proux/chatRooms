from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.contrib.humanize.templatetags.humanize import naturaltime

class User(AbstractUser):
    friends = models.ManyToManyField('self', blank=True)

class Room(models.Model):
    name = models.CharField(max_length=50)
    users = models.ManyToManyField(User)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')
    is_group = models.BooleanField(default=False)
    def __str__(self):
        return self.name

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=200)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    message = models.CharField(max_length=400)
    date = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.message