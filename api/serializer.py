import json
from rest_framework.serializers import ModelSerializer, RelatedField
from rest_framework.utils import representation
from .models import AuthToken, Bookmark, Comment, Post, User

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

class RandomPostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = ['id']

class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class CreatePostSearializer(ModelSerializer):
    class Meta:
        model = Post
        fields = ['image']

class PostComentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class GetCommentSerializer(ModelSerializer):
    class Meta:
        model = Comment

    def to_representation(self, instance):
        representation = {}
        representation['id'] = instance.id
        representation['comment'] = instance.comment
        representation['user'] = instance.user.id
        representation['username'] = instance.user.username

        return representation

class BookmarkSerializer(ModelSerializer):
    class Meta:
        model = Bookmark
        fields = '__all__'

class BookmarksSerializer(ModelSerializer):
    post = PostSerializer(read_only=True)

    class Meta:
        model = Bookmark
        fields = ['id', 'post']
