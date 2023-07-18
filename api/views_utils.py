from rest_framework.response import Response
from rest_framework.views import status

from api.models import AuthToken

def getResponse(serializer, model, statusCode, single):
    if model and single:
        serializer = serializer(model[0], many=False)
        return Response(serializer.data, status=statusCode)
    elif model and not single:
        serializer = serializer(model, many=True)
        return Response(serializer.data, status=statusCode)
    return Response({ 'No data' }, status=status.HTTP_204_NO_CONTENT)

def checkAuthToken(headers):
    if 'AuthToken' in headers:
        try:
            token = AuthToken.objects.get(tokenId=headers['AuthToken'])
            print(token.get())
            if token.get() == None:
                return Response({ 'Not Allowed' }, status=status.HTTP_401_UNAUTHORIZED)
            return None
        except:
            return Response({ 'Not Allowed' }, status=status.HTTP_401_UNAUTHORIZED)

