from django.urls import path, re_path
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
    re_path(r'^getUpdates/(?:(?P<id>\d+))?/$', views.getUpdates, name='getUpdates'),
    path('sendMessage/', views.sendMessage, name='sendMessage'),
    path('addRoom/', view=views.addRoom, name='addRoom'),
    path('addUser/', view=views.addUser, name='addUser'),
    path('removeUser/<int:id>/<str:user_name>', view=views.removeUser, name='deleteUser'),
    path('quitRoom/<int:id>/', view=views.quitRoom, name='quitRoom'),
    path('unfriend/<str:user_name>/', view=views.unfriend, name='unfriend'),
    path('friendRequest/', view=views.friendRequest, name='friendRequest'),
    path('acceptRequest/<str:user_name>/', view=views.acceptRequest, name='addFriend'),
    path('refuseRequest/<str:user_name>/', view=views.refuseRequest, name='refuseRequest'),
    path('settings', views.user_settings, name='chatRooms'),
    path('settings/changeUsername', views.changeUsername, name='changeUsername'),
    path('settings/changeTheme', views.changeTheme, name='changeTheme'),
    path('deleteUser', views.deleteUser, name='deleteUser'),
]