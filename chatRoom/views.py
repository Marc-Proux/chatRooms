from django.http import HttpResponseRedirect, Http404, JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm
from django.contrib.auth import login as auth_login
from django.contrib.auth import authenticate, get_user_model, update_session_auth_hash
from django.contrib import messages
from .models import Room, Message, FriendRequest
from .forms import SignUpForm
from django.db.models import Max
from django.conf import settings
User = get_user_model()


# Page d'accueil
def index(request):
    return render(request, 'chatRoom/index.html')

# Page de connexion
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

# Page d'inscription
def signup(request):
    if request.method == 'POST':
        if User.objects.filter(username=request.POST['username']).exists():
            messages.error(request,"Nom d'utilisateur déjà utilisé.")
            return HttpResponseRedirect('/signup')
        elif request.POST['password1'] != request.POST['password2']:
            messages.error(request,"Les mots de passe ne sont pas identiques.")
            return HttpResponseRedirect('/signup')
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            auth_login(request, user)
            return HttpResponseRedirect('/chatrooms')
        else :
            messages.error(request,"Formulaire invalide.")
            return HttpResponseRedirect('/signup')
    else:
        form = SignUpForm()
    return render(request, 'chatRoom/signup.html', {'form': form})


# Page de chat sans salon d'ouvert
def chatRooms(request):
    last_message_time = Max("message__date")
    room_list = Room.objects.filter(users=request.user).annotate(last_message_time=last_message_time).order_by('-last_message_time')
    return render(request, 'chatRoom/main-page.html', {'room_list':room_list})

# Page de chat avec un salon d'ouvert
def room(request, id):
    if request.user.is_authenticated == False:
        return HttpResponseRedirect('/login')
    if id not in Room.objects.filter(users=request.user).values_list('pk', flat=True):
        raise Http404('Page not found')
    room = get_object_or_404(Room, id=id)
    friend = ''
    for users in room.users.all():
        if users != request.user and users != User.objects.get(username='System'):
            friend = users.username
            break
    last_message_time = Max("message__date")
    room_list = Room.objects.filter(users=request.user).annotate(last_message_time=last_message_time).order_by('-last_message_time')
    return render(request, 'chatRoom/main-page.html', {'room_list':room_list, 'current_room':room, 'user_list':room.users.all(), 'owner':room.owner.username, 'System':'System', 'friend':friend})


# Fonction pour envoyer un message
def sendMessage(request):
    text = request.POST['value']
    room = get_object_or_404(Room, id=request.POST['room_id'])
    user_list = room.users.all()
    if request.user not in user_list:
        return JsonResponse({'redirect':'/chatrooms/'})
    if text == "" or text[0] == " " or len(text) > 400:
        return JsonResponse({'error':'Message invalide'})
    if settings.SAFE_LANGUAGE:
        print("Safe mode activé.")
        for word in settings.BAD_WORDS:
            if word in text.lower():
                print("Mot interdit détecté.")
                first_letter = text.lower().find(word)
                print(first_letter)
                new_word = text[first_letter]+ (len(word)-1)*"*"
                print(new_word)
                text = text.lower().replace(word, new_word)
    new_message = Message(user = request.user, username=request.user.username, message=text, room=Room.objects.get(id=request.POST['room_id']))
    new_message.save()
    return JsonResponse({})

# fonction créer un salon
def addRoom(request):
    room_name = request.POST['room_name']
    if room_name == "" or room_name[0] == " " or len(room_name)>50:
        messages.error(request,"Nom de chatroom invalide.", extra_tags='roomForm')
        return JsonResponse({'redirect':'/chatrooms'})
    new_room = Room(name=room_name, owner=request.user, is_group=True)
    new_room.save()
    new_room.users.add(request.user, User.objects.get(username='System'))
    admin_message = Message(user = User.objects.get(username='System'), username=' ', message='Bienvenue dans le salon "'+room_name+'"', room=Room.objects.get(id=new_room.id))
    admin_message.save()
    return JsonResponse({'room_id':new_room.id})

# fonction pour ajouter un utilisateur dans un salon
def addUser(request):
    user_name = request.POST['user_name']
    room_id = request.POST['room_id']
    room = get_object_or_404(Room, id=room_id)
    if request.user.username == 'System' or room.owner == request.user:
        if User.objects.filter(username=user_name).exists():
            user = User.objects.get(username=user_name)
            if user not in room.users.all():
                room.users.add(user)
                admin_message = Message(user = User.objects.get(username='System'), username=' ', message=user.username+' a rejoint le salon', room=room)
                admin_message.save()
                return JsonResponse({'redirect':'/chatrooms/'+str(room_id)+'/'})
            else:
                messages.error(request,"Utilisateur déjà dans le salon.", extra_tags='userForm')
                return JsonResponse({'redirect':'/chatrooms/'+str(room_id)+'/'})
    messages.error(request,"Utilisateur introuvable.", extra_tags='userForm')
    return JsonResponse({'redirect':'/chatrooms/'+str(room_id)+'/'})

# fonction pour supprimer un utilisateur d'un salon
def deleteUser(request, id, user_name):
    room = get_object_or_404(Room, id=id)
    if request.user.username == 'System' or room.owner == request.user:
        if len(room.users.all()) <= 2:
            print("delete room")
            room.delete()
            return HttpResponseRedirect('/chatrooms')
        delete_user = User.objects.get(username=user_name)
        if room.owner == delete_user:
            user_list = room.users.all()
            for users in user_list:
                if users != delete_user and users != User.objects.get(username='System'):
                    room.owner = users
                    room.save()
                    print("new owner:"+users.username)
                    break
        room.users.remove(delete_user)
        admin_message = Message(user = User.objects.get(username='System'), username=' ', message=delete_user.username+' a quitté le salon', room=room)
        admin_message.save()
        return HttpResponseRedirect('/chatrooms/'+str(id)+'/')
    return HttpResponseRedirect('/chatrooms/'+str(id)+'/')

# fonction pour quitter un salon
def quitRoom(request, id):
    delete_user = request.user
    room = get_object_or_404(Room, id=id)
    user_list = room.users.all()
    print(len(user_list))
    if len(user_list) <= 2:
        print("delete room")
        room.delete()
        return HttpResponseRedirect('/chatrooms')
    elif room.owner == delete_user:
        for user in user_list:
            if user != delete_user and user != User.objects.get(username='System'):
                room.owner = user
                break
        room.users.remove(delete_user)
        room.save()
        admin_message = Message(user = User.objects.get(username='System'), username=' ', message=delete_user.username+' a quitté le salon', room=room)
        admin_message.save()
        return HttpResponseRedirect('/chatrooms')
    else :
        room.users.remove(delete_user)
        admin_message = Message(user = User.objects.get(username='System'), username=' ', message=delete_user.username+' a quitté le salon', room=room)
        admin_message.save()
        return HttpResponseRedirect('/chatrooms')

def friendRequest(request):
    user_name = request.POST['friend_name']
    if User.objects.filter(username=user_name).exists():
        user = User.objects.get(username=user_name)
        if user != request.user and user != User.objects.get(username='System'):
            request_sent = user.requests_received.all().filter(sender=request.user)
            if user not in request.user.friends.all():
                if not request_sent:
                    new_request = FriendRequest(sender=request.user, receiver=user, status=0)
                    new_request.save()
                    return JsonResponse({'redirect':'sucess'})
                else:
                    messages.error(request,"Demande d'ami déjà envoyée.", extra_tags='friendForm')
                    return JsonResponse({'redirect':'/chatrooms'})
            else:
                messages.error(request,"Utilisateur déjà ami.", extra_tags='friendForm')
                return JsonResponse({'redirect':'/chatrooms'})
    messages.error(request,"Utilisateur introuvable.", extra_tags='friendForm')
    return JsonResponse({'redirect':'/chatrooms'})


def acceptRequest(request, user_name):
    if User.objects.filter(username=user_name).exists():
        user = User.objects.get(username=user_name)
        if user != request.user:
            if request.user.requests_received.all().filter(sender=user):
                request.user.friends.add(user)
                new_room = Room(name=request.user.username+'/'+user.username , owner=User.objects.get(username='System'), is_group=False)
                new_room.save()
                new_room.users.add(request.user, user, User.objects.get(username='System'))
                admin_message = Message(user = User.objects.get(username='System'), username=' ', message='Bienvenue dans le salon privé avec '+user.username+' et '+request.user.username, room=Room.objects.get(id=new_room.id))
                admin_message.save()
                request_sent = request.user.requests_received.all().filter(sender=user)
                request_sent.delete()
                return HttpResponseRedirect('/chatrooms/'+str(new_room.id)+'/')
            else:
                return HttpResponseRedirect('/chatrooms')
    messages.error(request,"Utilisateur introuvable.", extra_tags='friendForm')
    return HttpResponseRedirect('/chatrooms')

def refuseRequest(request, user_name):
    if User.objects.filter(username=user_name).exists():
        user = User.objects.get(username=user_name)
        if user != request.user:
            if request.user.requests_received.all().filter(sender=user):
                request_sent = request.user.requests_received.all().filter(sender=user)
                request_sent.delete()
                return HttpResponseRedirect('/chatrooms')
            else:
                return JsonResponse({'redirect':'/chatrooms'})
    messages.error(request,"Utilisateur introuvable.", extra_tags='friendForm')
    return JsonResponse({'redirect':'/chatrooms'})

def unfriend(request, user_name):
    if User.objects.filter(username=user_name).exists():
        user = User.objects.get(username=user_name)
        print("unfriend :"+user.username)
        if user != request.user:
            if user in request.user.friends.all():
                room = Room.objects.filter(users=user, is_group=False).filter(users=request.user).get()
                room.delete()
                request.user.friends.remove(user)
                return HttpResponseRedirect('/chatrooms')
            else:
                return JsonResponse({'redirect':'/chatrooms'})
    return HttpResponseRedirect('/chatrooms')

# fonction pour envoyer les mise à jour des messages et des utilisateurs
def getUpdates(request, id=None):
    last_message_time = Max("message__date")
    room_list = Room.objects.filter(users=request.user, is_group=True).annotate(last_message_time=last_message_time).order_by('-last_message_time')
    privates = Room.objects.filter(users=request.user, is_group=False).annotate(last_message_time=last_message_time).order_by('-last_message_time')
    private_list = []
    for private in privates:
        friend = {}
        for users in private.users.all():
            if users != request.user and users != User.objects.get(username='System'):
                friend["name"] = users.username
                break
        friend["id"] = private.id
        private_list.append(friend)
    request_list = []
    for request in request.user.requests_received.all():
        request_user = {}
        request_user["name"] = request.sender.username
        request_list.append(request_user)

    if id :
        room = get_object_or_404(Room, id=id)
        if request.user not in room.users.all():
            return JsonResponse({'redirect':'True'})
        messages = room.message_set.all()
        return JsonResponse({'messages':list(messages.values()), 'user_list':list(room.users.all().values()), 'room_list':list(room_list.values()), 'owner':room.owner.username, 'private_list':private_list, 'request_list':request_list})
    
    return JsonResponse({'room_list':list(room_list.values()), 'private_list':private_list, 'request_list':request_list})

def changePassword(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            messages.success(request, 'Votre mot de passe a été changé avec succès.')
            return redirect('change_password')
        else:
            messages.error(request, 'Veuillez corriger les erreurs ci-dessous.')
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'chatRoom/change_password.html', {'form': form})

# Page d'erreur 404
def error404(request, exception):
    return render(request,'chatRoom/404.html')