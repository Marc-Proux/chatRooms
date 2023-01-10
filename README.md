<h1 align="center">
	Chat Room
</h1>

<p align ="center">
	The chat room project is an end of semester project of the first 
	year of the engineering cycle. It aims to deploy a chat platform with 
	account management and creation of rooms by the user.
</p>

<hr />

## Packages
mettre les packages utilisés

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
Ajouter votre URL
```
ALLOWED_HOSTS = ['{URL}']
```

## Documentation
blablabla

<footer>
<p align="center">
Built by Lucas, Geryes and Marc, <a href="https://www.ensisa.uha.fr">ENSISA</a> 
students.
</p>
</footer>
