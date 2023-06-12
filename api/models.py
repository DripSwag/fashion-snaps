from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)

class Post(models.Model):
    image = models.ImageField(upload_to='media/')
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    comment = models.CharField(max_length=200)
