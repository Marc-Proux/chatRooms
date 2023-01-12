from django.http import HttpResponseRedirect, Http404, JsonResponse, HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login as auth_login
from django.contrib.auth import authenticate
from django.urls import reverse_lazy
from django.views import generic
from django.contrib import messages
from .models import Room, Message
from django.db.models import Max
import json

def index(request):
    return render(request, 'chatRoom/index.html')

def login(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect('/chatrooms')
    else:
        if request.method == 'POST':
            form = AuthenticationForm(request.POST)
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(username=username, password=password)
        
            if user is not None:
                if user.is_active:
                    auth_login(request, user)
                    return HttpResponseRedirect('/chatrooms')
            else:
                messages.error(request,"Nom d'utilisateur ou mot de passe incorrect")
                return HttpResponseRedirect('/login')
        
        else:
            form = AuthenticationForm()
        return render(request, 'chatRoom/login.html', {'form': form})

def signup(request):
    if request.method == 'POST':
        if User.objects.filter(username=request.POST['username']).exists():
            messages.error(request,"Nom d'utilisateur déjà utilisé.")
            return HttpResponseRedirect('/signup')
        elif request.POST['password1'] != request.POST['password2']:
            messages.error(request,"Les mots de passe ne sont pas identiques.")
            return HttpResponseRedirect('/signup')
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            auth_login(request, user)
            return HttpResponseRedirect('/chatrooms')
    else:
        form = UserCreationForm()
    return render(request, 'chatRoom/signup.html', {'form': form})

def chatRooms(request):
    last_message_time = Max("message__date")
    room_list = Room.objects.filter(users=request.user).annotate(last_message_time=last_message_time).order_by('-last_message_time')
    if len(room_list) == 0:
        return render(request, 'chatRoom/main-page.html', {'room_list':room_list})
    id = room_list[0].id
    return HttpResponseRedirect('/chatrooms/'+str(id)+'/')

def room(request, id):
    if id not in Room.objects.filter(users=request.user).values_list('pk', flat=True):
        raise Http404('Page not found')
    room = get_object_or_404(Room, id=id)
    last_message_time = Max("message__date")
    room_list = Room.objects.filter(users=request.user).annotate(last_message_time=last_message_time).order_by('-last_message_time')
    return render(request, 'chatRoom/main-page.html', {'room_list':room_list, 'current_room':room, 'user_list':room.users.all(), 'owner':room.owner.username})

def addRoom(request):
    roomName = request.POST['room_name']
    print(roomName)
    if roomName == "" or roomName[0] == " ":
        messages.error(request,"Nom de chatroom invalide.")
        return HttpResponseRedirect('/chatrooms')
    newRoom = Room(name=roomName, owner=request.user)
    newRoom.save()
    newRoom.users.add(request.user)
    return HttpResponse(json.dumps({'room_id':newRoom.id}), safe=False)

def getMessages(request, id):
    room = get_object_or_404(Room, id=id)
    messages = room.message_set.all()
    return JsonResponse({'messages':list(messages.values())})

def sendMessage(request):
    text = request.POST['value']
    new_message = Message(user = request.user, username=request.user.username, message=text, room=Room.objects.get(id=request.POST['room_id']))
    new_message.save()
    return HttpResponseRedirect('/chatrooms/'+str(request.POST['room_id'])+'/')

def error_404(request, exception):
    return render(request,'chatRoom/404.html')