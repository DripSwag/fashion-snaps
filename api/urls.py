from . import views
from django.urls import path

urlpatterns = [
    path('login', views.login),
    path('user', views.createUser),
    path('authorization/<str:tokenId>', views.validateAuthorizationToken),
    path('post/create/<int:userId>', views.newPost),
    path('post/delete/<int:postId>', views.deletePost),
    path('post/user/get/<int:userId>', views.getUserPosts),
    path('post/get', views.getRandomPost),
    path('post/enqueue', views.userQueueEnqueue),
    path('post/get/<int:postId>', views.getPost),
    path('comment/create', views.createComment),
    path('comment/get/<int:postId>', views.getComments),
    path('bookmark', views.putBookmark),
    path('bookmark/<int:userId>', views.getUserBookmarks),
    path('bookmark/<int:userId>/<int:postId>', views.getBookmark),
]
