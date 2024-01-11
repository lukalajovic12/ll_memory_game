
from rest_framework import viewsets
from rest_framework.views import APIView
from .models import MemoryGame, GameSettings
from .serializers import MemoryGameSerializer,UserSerializer,MemoryGameSerializerScore, GameSettingsSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Max

class MemoryGameView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = MemoryGameSerializer
    queryset = MemoryGame.objects.all()



class MemoryGameViewUserScore(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        parameter_user_id = request.query_params.get('user_id', None)
        parameter_game_title = request.query_params.get('title', None)
        if parameter_user_id is None and parameter_game_title is None:
            queryset = MemoryGame.objects.all()
        elif parameter_user_id is not None and parameter_game_title is not None:
            queryset1 = MemoryGame.objects.filter(user_id=parameter_user_id)
            queryset=queryset1.filter(title__icontains=parameter_game_title)
        elif parameter_user_id is not None:
            queryset = MemoryGame.objects.filter(user_id=parameter_user_id)
        else:
            queryset = MemoryGame.objects.filter(title__icontains=parameter_game_title)               
        serializer = MemoryGameSerializerScore(queryset, many=True)
        return Response(serializer.data)


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
class SettingsView(viewsets.ModelViewSet):
    serializer_class = GameSettingsSerializer
    queryset = GameSettings.objects.all()    
    
class SettingsGetView(APIView):
   # permission_classes = [IsAuthenticated]
    def get(self, request):
        parameter_user_id = request.query_params.get('user_id', None)
        parameter_game_title = request.query_params.get('title', None)
        if parameter_user_id is not None and parameter_game_title is not None:
            queryset1 = GameSettings.objects.filter(user_id=parameter_user_id)
            queryset2=queryset1.filter(title__icontains=parameter_game_title)
            max_id = queryset2.aggregate(max_id=Max('id'))['max_id']
            queryset=queryset2.filter(id=max_id)
        else:
            queryset = []              
        serializer = GameSettingsSerializer(queryset, many=True)
        return Response(serializer.data)


