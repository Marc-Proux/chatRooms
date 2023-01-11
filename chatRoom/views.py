from django.http import HttpResponseRedirect, Http404
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login as auth_login
from django.contrib.auth import authenticate
from django.urls import reverse_lazy
from django.views import generic
from django.contrib import messages
from .models import Room
from django.db.models import Max

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
                messages.error(request,'username or password not correct')
                return HttpResponseRedirect('/login')
        
        else:
            form = AuthenticationForm()
        return render(request, 'chatRoom/login.html', {'form': form})

def signup(request):
    if request.method == 'POST':
        if User.objects.filter(username=request.POST['username']).exists():
            messages.error(request,'username already exists')
            return HttpResponseRedirect('/signup')
        elif request.POST['password1'] != request.POST['password2']:
            messages.error(request,'passwords do not match')
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

class Signup(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'

def chatRooms(request):
    last_message_time = Max("message__date")
    room_list = Room.objects.filter(users=request.user).annotate(last_message_time=last_message_time).order_by('-last_message_time')
    id = room_list[0].id
    print(type(id))
    return HttpResponseRedirect('/chatrooms/'+str(id)+'/')

def room(request, id):
    if id not in Room.objects.filter(users=request.user).values_list('pk', flat=True):
        raise Http404('Page not found')
    last_message_time = Max("message__date")
    room_list = Room.objects.filter(users=request.user).annotate(last_message_time=last_message_time).order_by('-last_message_time')
    romm = get_object_or_404(Room, id=id)
    messages_in_room = romm.message_set.all()
    if request.method == 'POST':
        roomName = request.POST['room-name']
        newRoom = Room(name=roomName)
        newRoom.save()
        newRoom.users.add(request.user)
        return HttpResponseRedirect('/chatrooms/'+str(id)+'/')
    return render(request, 'chatRoom/main-page.html', {'room_list':room_list, 'messages_in_room':messages_in_room})

def error_404(request, exception):
    return render(request,'chatRoom/404.html')
