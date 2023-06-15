from django.http.multipartparser import MultiPartParser
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes, renderer_classes
from rest_framework.views import status
from .models import AuthToken, Post, User
from .serializer import PostSerializer, UserSerializer

# Create your views here.

@api_view(['GET'])
def login(request, username, password):
    if request.method == 'GET':
        try:
            user = User.objects.get(username=username, password=password)
            try:
                token = AuthToken.objects.get(user=user)
                token.update()
            except:
                user.createToken()
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response({ 'Not allowed' }, status=status.HTTP_401_UNAUTHORIZED)

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
        try:
            post = Post.objects.get(id=id)
            serializer = PostSerializer(post, many=False)
        except:
            return Response({ 'Not working' }, status=status.HTTP_400_BAD_REQUEST)

