from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render, get_object_or_404
from .models import Room, Message, Account
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic

def index(request):
    return render(request, 'chatRoom/index.html')

class Signup(generic.CreateView):
    form_class = UserCreationForm
    sucess_url = reverse_lazy('/login')
    template_name = 'registration/signup.html'

def chatRooms(request):
    user = Account.objects.get(id=2)
    return render(request, 'chatRoom/main-page.html', {'user':user})