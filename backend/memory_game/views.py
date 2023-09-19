
from rest_framework import viewsets
# Create your views here.
from .models import MemoryGame
from .serializers import MemoryGameSerializer
# Create your views here.

class MemoryGameView(viewsets.ModelViewSet):
    serializer_class = MemoryGameSerializer
    queryset = MemoryGame.objects.all()