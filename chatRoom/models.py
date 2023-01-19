from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.contrib.humanize.templatetags.humanize import naturaltime

class User(AbstractUser):
    THEME_CHOICES = (
        (0, 'Light'),
        (1, 'Dark'),
    )
    friends = models.ManyToManyField('self', blank=True)
    theme = models.IntegerField(choices=THEME_CHOICES, default=1)

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

class FriendRequest(models.Model):
    STATUS_CHOICES = (
        (1, 'Pending'),
        (2, 'Accepted'),
        (3, 'Rejected'),
    )
    status = models.IntegerField(choices=STATUS_CHOICES, default=1)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requests_sent')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requests_received')
    def __str__(self):
        return self.sender.username + " sent a friend request to " + self.receiver.username