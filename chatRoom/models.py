from django.db import models
from django.contrib.auth.models import User

'''
class Account(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField('self', blank=True)
    def __str__(self):
        return str(self.username)'''

class Room(models.Model):
    name = models.CharField(max_length=200)
    users = models.ManyToManyField(User)
    def __str__(self):
        return self.name

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    message = models.CharField(max_length=200)
    date = models.DateTimeField('date published')
    def __str__(self):
        return self.message