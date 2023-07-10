from django.http.multipartparser import MultiPartParser
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes, renderer_classes
from rest_framework.views import status
from .models import AuthToken, Bookmark, Comment, Post, User
from .serializer import BookmarkSerializer, BookmarksSerializer, GetCommentSerializer, LoginSerializer, PostComentSerializer, RandomPostSerializer, PostSerializer, TokenSerializer
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

@api_view(['GET'])
def validateAuthorizationToken(request, tokenId):
    if request.method == 'GET':
        try:
            token = AuthToken.objects.get(tokenId=tokenId).get()
            serializer = TokenSerializer(token, many=False)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response({ 'Unauthorized' }, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def newPost(request, userId):
    print(request.data)
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

@api_view(['GET'])
def getUserPosts(request, userId):
    if request.method == 'GET':
        posts = Post.objects.filter(user=userId)
        return getResponse(PostSerializer, posts, status.HTTP_200_OK, single=False)

@api_view(['DELETE'])
def deletePost(request, postId):
    if request.method == 'DELETE':
        try:
            post = Post.objects.get(id=postId)
            post.delete()
            return Response({ 'Deleted' }, status=status.HTTP_200_OK)
        except:
            return Response({ 'No data' }, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def createComment(request):
    serializer = PostComentSerializer(data=request.data)
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
            return getResponse(serializer=GetCommentSerializer, model=[Comment.objects.all().filter(post=postId)[random.randint(0, count - 1)]], statusCode=status.HTTP_200_OK, single=True)
        else:
            return getResponse(serializer=GetCommentSerializer, model=[], statusCode=status.HTTP_200_OK, single=True)

@api_view(['PUT'])
def putBookmark(request):
    if request.method == 'PUT':
        data = request.data
        try:
            bookmark = Bookmark.objects.get(user=data['user'], post=data['post'])
            bookmark.delete()
            return Response({ 'Deleted' }, status=status.HTTP_200_OK)
        except:
            serializer = BookmarkSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def getUserBookmarks(request, userId):
    if request.method == 'GET':
        bookmark = Bookmark.objects.filter(user=userId)
        return getResponse(serializer=BookmarksSerializer, model=bookmark, statusCode=status.HTTP_200_OK, single=False)

@api_view(['GET'])
def getBookmark(request, userId, postId):
    if request.method == 'GET':
        bookmark = Bookmark.objects.filter(user=userId, post=postId)
        return getResponse(serializer=BookmarkSerializer, model=bookmark, statusCode=status.HTTP_200_OK, single=True)

