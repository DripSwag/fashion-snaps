from http.client import NON_AUTHORITATIVE_INFORMATION
import random
from django.db import models
from datetime import datetime, timedelta, timezone
from .model_utils import createTokenId, createDate
from django.db.models import Q

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=256)

    def createToken(self):
        authToken = AuthToken(user=self, tokenId=createTokenId(), expiresIn=createDate())
        authToken.save()

class Post(models.Model):
    image = models.ImageField(upload_to='media/')
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, default=1)
    comment = models.CharField(max_length=500)

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, default=1)

class AuthToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1, related_name='token')
    tokenId = models.CharField(max_length=20)
    expiresIn = models.DateTimeField(default=datetime.now, blank=True)

    def update(self):
        self.tokenId = createTokenId()
        self.expiresIn = createDate()
        self.save()

    def get(self):
        if datetime.now(timezone(offset=timedelta())) < self.expiresIn:
            return self
        else:
            return None

class UserPostQueue(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    def enqueuePost(self, postId: int):
        post = UserPostQueueEntity(post=postId, queue=self.id)
        post.save()

    def getRandomPost(self):
        visited = UserPostQueueEntity.objects.filter(queue=self.id).values_list('post', flat=True)
        visited = list(visited)
        notVisited = Post.objects.filter(~Q(id__in=visited))
        if notVisited.count() != 0:
            return notVisited[random.randint(0, notVisited.count() - 1)]
        else:
            return

class UserPostQueueEntity(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, default=1)
    queue = models.ForeignKey(UserPostQueue, on_delete=models.CASCADE, default=1)

