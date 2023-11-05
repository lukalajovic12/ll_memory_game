from rest_framework import serializers
from .models import MemoryGame
from django.contrib.auth.models import User
class MemoryGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemoryGame
        fields = ('id', 'title', 'points','user_id')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username',"password"]
    def create(self,validated_data):
        user=User.objects.create_user(**validated_data)
        return user