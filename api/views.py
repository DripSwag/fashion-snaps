from django.http.multipartparser import MultiPartParser
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes, renderer_classes
from rest_framework.views import status
from .models import AuthToken, Comment, Post, User
from .serializer import CommentSerializer, LoginSerializer, RandomPostSerializer, PostSerializer
from .views_utils import getResponse
import random

# Create your views here.

@api_view(['GET'])
def login(request, username, password):
    if request.method == 'GET':
        user = User.objects.filter(username=username, password=password)
        if user.count() == 1:
            try:
                token = AuthToken.objects.get(user=user[0])
                token.update()
            except:
                user[0].createToken()
        return getResponse(serializer=LoginSerializer, model=user, statusCode=status.HTTP_200_OK, single=True)


@api_view(['POST'])
def newPost(request):
    if request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

@api_view(['GET'])
def getRandomPost(request):
    if request.method == 'GET':
        post = Post.objects.all()[random.randint(0, Post.objects.count() - 1)]
        serializer = RandomPostSerializer(post)
        return Response(serializer.data)

@api_view(['GET'])
def getPost(request, postId):
    if request.method == 'GET':
        post = Post.objects.filter(id=postId)
        return getResponse(PostSerializer, post, status.HTTP_200_OK, single=True)

@api_view(['POST'])
def createComment(request):
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['GET'])
def getComments(request, postId):
    if request.method == 'GET':
        count = Comment.objects.filter(post=postId).count()
        if count > 0:
            # Why do I have to make an array for this function
            return getResponse(serializer=CommentSerializer, model=[Comment.objects.all().filter(post=postId)[random.randint(0, count - 1)]], statusCode=status.HTTP_200_OK, single=True)
        else:
            return getResponse(serializer=CommentSerializer, model=[], statusCode=status.HTTP_200_OK, single=True)


