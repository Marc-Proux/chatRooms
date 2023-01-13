<h1 align="center">
	ChatRoom
</h1>

<p align ="center">
	ChatRoom est un projet de fin de semestre de première année en cycle
	ingénieur en Informatique & Réseaux.<br></br>
	ChatRoom est une <a href="https://fr.wikipedia.org/wiki/Application_web">Application Web</a>
	de <a href ="https://fr.wikipedia.org/wiki/Chat_en_ligne">Chat en Ligne</a> gratuite et 
	hébergeable sur tout serveur.<br></br>
	Découvrez le site <a href="http://chatrooms.alwaysdata.net/">ChatRoom</a>.
</p>

<hr />

## Packages

Django <a href="https://docs.djangoproject.com/en/4.1/releases/4.1/">4.1</a><br/>
Python <a href="https://www.python.org/downloads/release/python-3108/">3.10.8</a>


## Installation
ChatRoom est un projet Web, front-end et back-end nécessitant plusieurs packages. Accedez à la console de votre serveur pour suivre la procédure d'installation.

Création de l'environnement virtuel pour django
```
python -m venv djangoenv
```

Activation de l'environnement virtuel
```
source djangoenv/bin/activate
```

Installation de Django
```
pip install Django
```

Transfère de l'application sur le serveur en cloant le git
```
git clone https://github.com/Marc-Proux/chatRoom.git
```

Configurez le serveur en Python WSGI

Le chemin d'application à 
```
/chatRoom/chatRoom_project/wsgi.py
```

Le répertoire de travail et du virtualenv
```
/chatRoom/
```
```
/djangoenv/
```

Et Chemins Statiques
```
/static=/chatRoom/chatRoom/static
```


Enfin, dans le fichier
```
chatRoom/chatRoom_project/settings.py
```
Ajoutez votre URL
```
ALLOWED_HOSTS = ['{URL}']
```

L'application possède un superuser 'System' nécessaire à son fonctionnement.
Il a accès à l'ensemble des salons et à leur gestion.
Changez son mot de passe avec la commande
```
python manage.py changepassword System
```

## Fonctionnalités

 - S'inscrie et se connecter à son compte personnel
 - Rejoindre un salon existant ou en créer un et y ajouter d'autres utilisateurs
 - Envoyer des messages contenant des emojis

## License

Application sous [license MIT]

<footer>
<p align="center">
Créé avec ❤️ par Lucas, Geryes and Marc, <a href="https://www.ensisa.uha.fr">ENSISA</a> 
students.
</p>
</footer>
