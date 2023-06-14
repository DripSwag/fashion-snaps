from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import status
from .models import AuthToken, User
from .serializer import UserSerializer

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
            return Response({}, status=status.HTTP_401_UNAUTHORIZED)

