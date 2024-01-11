from django.db import models
from django.contrib.auth.models import User

class GameSettings(models.Model):
        user = models.ForeignKey(User, on_delete=models.CASCADE)
        lives = models.IntegerField()
        startLevel = models.IntegerField()
        mistakes = models.IntegerField()      
        title = models.CharField(max_length=120)      
        
         
class MemoryGame(models.Model):
    title = models.CharField(max_length=120)
    points = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    settings = models.ForeignKey(GameSettings, on_delete=models.CASCADE)
    def _str_(self):
        return self.title
    


        