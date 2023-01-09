from django.contrib import admin
from .models import User, Message, Room

admin.site.register(User)
admin.site.register(Message)
admin.site.register(Room)