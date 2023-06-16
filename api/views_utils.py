from rest_framework.response import Response
from rest_framework.views import status

def getResponse(serializer, model, statusCode, single):
    if model and single:
        serializer = serializer(model[0], many=False)
        return Response(serializer.data, status=statusCode)
    elif model and not single:
        serializer = serializer(model, many=True)
        return Response(serializer.data, status=statusCode)
    return Response({ 'No data' }, status=status.HTTP_204_NO_CONTENT)
