from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('', include('django.contrib.auth.urls')),
    path('chatrooms', views.chatRooms, name='chatRooms'),
    path('signup', views.Signup.as_view(), name='signup'),
]