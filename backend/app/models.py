from mongoengine import *

class Post(Document):
    title = StringField(required=True)
    textid = StringField()  # Identifiant textuel
    imageUrl = URLField()  # URL de l'image
    description = StringField()  # Description du projet
    sitetype = StringField()  # Type de site (ex: "Site Internet PHP")
    content = StringField()  # Contenu HTML
    author = StringField()  # Auteur du post
    createdAt = DateTimeField()  # Date de création
    updatedAt = DateTimeField()  # Date de mise à jour
    clientName = StringField()  # Nom du client
    clientComment = StringField()  # Commentaire du client
    projectLink = URLField()  # Lien vers le projet
    clientCommentOrigin = StringField()  # Origine du commentaire
    interlocuterName = StringField()  # Nom de l'interlocuteur

    meta = {'collection': 'posts'}