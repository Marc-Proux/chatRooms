from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render

def index(request):
    return render(request, 'chatRoom/index.html')

def login(request):
    return render(request, 'chatRoom/login.html')