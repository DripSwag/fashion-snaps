from . import views
from django.urls import path

urlpatterns = [
    path('login/<str:username>/<str:password>/', views.login),
    path('post/create', views.newPost),
    path('post/get', views.getRandomPost),
    path('post/get/<int:postId>', views.getPost),
    path('comment/create', views.createComment),
    path('comment/get/<int:postId>', views.getComments),
]
