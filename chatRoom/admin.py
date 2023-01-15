from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Room, Message, User

class UserAdmin(UserAdmin):
    list_display=('username','is_staff')

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Friends', {'fields': ('friends',)}),
    )

    add_fieldsets = (
        (None, {'fields': ('username', 'password1', 'password2')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Friends', {'fields': ('friends',)}),
    )

admin.site.register(User, UserAdmin)
admin.site.register(Room)   
admin.site.register(Message)