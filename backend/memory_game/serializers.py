from rest_framework import serializers
from .models import MemoryGame

class MemoryGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemoryGame
        fields = ('id', 'title', 'points', 'type')