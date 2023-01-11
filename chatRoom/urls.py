from django.urls import path
from django.contrib.auth.views import LogoutView
from . import views
from django.conf import settings

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login, name='login'),
    path('chatrooms', views.chatRooms, name='chatRooms'),
    path('chatrooms/<int:id>/', views.room, name='room'),
    path('signup', views.signup, name='signup'),
    path('logout/', LogoutView.as_view(next_page=settings.LOGOUT_REDIRECT_URL), name='logout'),
    path('getMessages/<int:id>/', views.getMessages, name='getMessages'),
    path('sendMessage/', views.sendMessage, name='sendMessage'),
]