from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import status
from .models import AuthToken, Bookmark, Comment, Post, User, UserPostQueue, UserPostQueueEntity
from .serializer import BookmarkSerializer, BookmarksSerializer, GetCommentSerializer, LoginSerializer, PostComentSerializer, RandomPostSerializer, PostSerializer, TokenSerializer, UserPostQueueSerializer, UserSerializer
from .views_utils import checkAuthToken, getResponse
import random
from hashlib import sha256

# Create your views here.

@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        user = User.objects.filter(username=request.data['username'], password=sha256(request.data['password'].encode('utf-8')).hexdigest())
        if user.count() == 1:
            try:
                token = AuthToken.objects.get(user=user[0])
                token.update()
            except:
                user[0].createToken()
        return getResponse(serializer=LoginSerializer, model=user, statusCode=status.HTTP_200_OK, single=True)

@api_view(['POST'])
def createUser(request):
    if request.method == 'POST':
        data = request.data
        data['password'] = sha256(data['password'].encode('utf-8')).hexdigest()
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

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
    auth = checkAuthToken(request.headers)
    if auth:
        return auth
    if request.method == 'POST':
        data = request.data
        data['user'] = userId
        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

@api_view(['PUT'])
def getRandomPost(request):
    auth = checkAuthToken(request.headers)
    if auth:
        return auth
    if request.method == 'PUT':
        queue = UserPostQueue.objects.filter(user=request.data['user'])
        if queue.count() == 1:
            post = queue[0].getRandomPost()
            serializer = PostSerializer(post, many=False)
            return Response(serializer.data)
        else:
            serializer = UserPostQueueSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                queue = UserPostQueue.objects.filter(user=request.data['user'])
                post = queue[0].getRandomPost()
                serializer = PostSerializer(post, many=False)
                return Response(serializer.data)

@api_view(['POST'])
def userQueueEnqueue(request):
    auth = checkAuthToken(request.headers)
    if auth:
        return auth
    if request.method == 'POST':
        try:
            queue = UserPostQueue.objects.get(user=request.data['user'])
            queue.enqueuePost(request.data['post'])
            return Response({ 'Added' }, status=status.HTTP_201_CREATED)
        except:
            return Response({ 'Fail' }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def userQueueDelete(request, userId):
    auth = checkAuthToken(request.headers)
    if auth:
        return auth
    if request.method == 'DELETE':
        try:
            queue = UserPostQueue.objects.get(user=userId)
            posts = UserPostQueueEntity.objects.filter(queue=queue)
            posts.delete()
            return Response({ 'Deleted' }, status=status.HTTP_200_OK)
        except:
            return Response({ 'No data' }, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def getPost(request, postId):
    auth = checkAuthToken(request.headers)
    if auth:
        return auth
    if request.method == 'GET':
        post = Post.objects.filter(id=postId)
        if post.count() != 0:
            return getResponse(PostSerializer, post, status.HTTP_200_OK, single=True)
        else:
            return Response({ "id": 0, "image": "", "user": 0 })


@api_view(['GET'])
def getUserPosts(request, userId):
    auth = checkAuthToken(request.headers)
    if auth:
        return auth
    if request.method == 'GET':
        posts = Post.objects.filter(user=userId)
        return getResponse(PostSerializer, posts, status.HTTP_200_OK, single=False)

@api_view(['DELETE'])
def deletePost(request, postId):
    auth = checkAuthToken(request.headers)
    if auth:
        return auth
    if request.method == 'DELETE':
        try:
            post = Post.objects.get(id=postId)
            post.delete()
            return Response({ 'Deleted' }, status=status.HTTP_200_OK)
        except:
            return Response({ 'No data' }, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def createComment(request):
    auth = checkAuthToken(request.headers)
    if auth:
        return auth
    if request.method == 'POST':
        serializer = PostComentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


@api_view(['GET'])
def getComments(request, postId):
    auth = checkAuthToken(request.headers)
    if auth:
        return auth
    if request.method == 'GET':
        count = Comment.objects.filter(post=postId).count()
        if count > 0:
            # Why do I have to make an array for this function
            return getResponse(serializer=GetCommentSerializer, model=[Comment.objects.all().filter(post=postId)[random.randint(0, count - 1)]], statusCode=status.HTTP_200_OK, single=True)
        else:
            return getResponse(serializer=GetCommentSerializer, model=[], statusCode=status.HTTP_200_OK, single=True)

@api_view(['PUT'])
def putBookmark(request):
    auth = checkAuthToken(request.headers)
    if auth:
        return auth
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
    auth = checkAuthToken(request.headers)
    if auth:
        return auth
    if request.method == 'GET':
        bookmark = Bookmark.objects.filter(user=userId)
        return getResponse(serializer=BookmarksSerializer, model=bookmark, statusCode=status.HTTP_200_OK, single=False)

@api_view(['GET'])
def getBookmark(request, userId, postId):
    auth = checkAuthToken(request.headers)
    if auth:
        return auth
    if request.method == 'GET':
        bookmark = Bookmark.objects.filter(user=userId, post=postId)
        return getResponse(serializer=BookmarkSerializer, model=bookmark, statusCode=status.HTTP_200_OK, single=True)

