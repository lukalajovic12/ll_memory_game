
from rest_framework import viewsets
from rest_framework.views import APIView
from .models import MemoryGame
from .serializers import MemoryGameSerializer,UserSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response

class MemoryGameView(viewsets.ModelViewSet):
    serializer_class = MemoryGameSerializer
    queryset = MemoryGame.objects.all()



class MemoryGameViewUserScore(APIView):
    def get(self, request):
        print("SOS")
        parameter = request.query_params.get('user_id', None)
        if parameter is not None:
            queryset = MemoryGame.objects.filter(user_id=parameter)
        else:
            queryset = MemoryGame.objects.all()
        serializer = MemoryGameSerializer(queryset, many=True)
        return Response(serializer.data)

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
