from django.db import models
from django.contrib.auth.models import User

class GameSettings(models.Model):   
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lives = models.IntegerField(default=3)
    startLevel = models.IntegerField(default=3)
    mistakes = models.IntegerField(default=2)      
    title = models.CharField(max_length=120)      
    startTime = models.IntegerField(default=3000) # in miliseconds
    timeIncrease  = models.IntegerField(default=100) # in miliseconds      
         
class MemoryGame(models.Model):
    title = models.CharField(max_length=120)
    points = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    settings = models.ForeignKey(GameSettings, on_delete=models.CASCADE,null=True)
    def _str_(self):
        return self.title
    


        