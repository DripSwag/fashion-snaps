from django.db import models
from datetime import datetime
from .SpotifyUtils import createTokenId, createDate

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)

    def createToken(self):
        authToken = AuthToken(user=self, tokenId=createTokenId(), expiresIn=createDate())
        authToken.save()

class Post(models.Model):
    image = models.ImageField(upload_to='media/')
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, default=1)
    comment = models.CharField(max_length=200)

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, default=1)

class AuthToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    tokenId = models.CharField(max_length=20)
    expiresIn = models.DateField(default=datetime.now, blank=True)

    def update(self):
        self.tokenId = createTokenId()
        self.expiresIn = createDate()
        self.save()
