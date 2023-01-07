from django.db import models

class User(models.Model):
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    friends = models.ManyToManyField('self')
    def __str__(self):
        return self.username

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.message

class Room(models.Model):
    name = models.CharField(max_length=200)
    messages = models.ManyToManyField(Message)
    users = models.ManyToManyField(User)
    def __str__(self):
        return self.name