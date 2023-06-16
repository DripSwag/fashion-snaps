from django.http.multipartparser import MultiPartParser
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes, renderer_classes
from rest_framework.views import status
from .models import AuthToken, Comment, Post, User
from .serializer import CommentSerializer, PostSerializer, UserSerializer
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
        return getResponse(serializer=UserSerializer, model=user, statusCode=status.HTTP_200_OK, single=True)


@api_view(['POST'])
def newPost(request):
    if request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

@api_view(['GET'])
def getPost(request, id):
    if request.method == 'GET':
        post = Post.objects.filter(id=id)
        return getResponse(serializer=PostSerializer, model=post, statusCode=status.HTTP_200_OK, single=True)

@api_view(['POST'])
def createComment(request):
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['GET'])
def getComments(request):
    if request.method == 'GET':
        if Comment.objects.count() > 2:
            numberOfComments = 3
        else:
            numberOfComments = Comment.objects.count()
        #Inefficient apparently
        indexes = random.sample(range(Comment.objects.count()), numberOfComments)
        serializer = CommentSerializer([Comment.objects.all()[x] for x in indexes], many=True)
        return Response(serializer.data)
