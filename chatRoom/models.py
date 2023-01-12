from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.contrib.humanize.templatetags.humanize import naturaltime

'''
class Account(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField('self', blank=True)
    def __str__(self):
        return str(self.username)'''

class Room(models.Model):
    name = models.CharField(max_length=200)
    users = models.ManyToManyField(User)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')
    def __str__(self):
        return self.name

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=200)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    message = models.CharField(max_length=200)
    date = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.message