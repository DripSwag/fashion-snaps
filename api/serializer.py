from rest_framework.serializers import ModelSerializer
from .models import AuthToken, Comment, Post, User

class TokenSerializer(ModelSerializer):
    class Meta:
        model = AuthToken
        fields = ['tokenId']

class UsernameSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class LoginSerializer(ModelSerializer):
    token = TokenSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ['id', 'token']

class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment

    def to_representation(self, instance):
        representation = {}
        representation['id'] = instance.id
        representation['comment'] = instance.comment
        representation['username'] = instance.user.username

        return representation
