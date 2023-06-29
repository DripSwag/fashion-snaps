from django.contrib import admin
from .models import AuthToken, Bookmark, Comment, User, Post

# Register your models here.

admin.site.register(User)
admin.site.register(Post)
admin.site.register(AuthToken)
admin.site.register(Comment)
admin.site.register(Bookmark)
