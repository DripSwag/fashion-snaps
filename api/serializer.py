from rest_framework.serializers import ModelSerializer
from .models import AuthToken, Post, User

class TokenSerializer(ModelSerializer):
    class Meta:
        model = AuthToken
        fields = ['tokenId']

class UserSerializer(ModelSerializer):
    token = TokenSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ['id', 'token']

class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
