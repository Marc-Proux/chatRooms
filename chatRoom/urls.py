from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),
    path('chatrooms', views.chatRooms, name='chatRooms'),
    path('signup', views.signup, name='signup'),
]