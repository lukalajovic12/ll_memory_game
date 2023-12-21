from rest_framework import serializers
from .models import MemoryGame
from django.contrib.auth.models import User



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username',"password"]
    def create(self,validated_data):
        user=User.objects.create_user(**validated_data)
        return user
    
class MemoryGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemoryGame
        fields = ('id', 'title', 'points','user')
        
class MemoryGameSerializerScore(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    class Meta:
        model = MemoryGame
        fields = ('id', 'title', 'points','user','username')
        
    def get_username(self, obj):
        return obj.user.username        
    