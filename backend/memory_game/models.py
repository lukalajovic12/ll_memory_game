from django.db import models

# Create your models here.

class MemoryGame(models.Model):
    title = models.CharField(max_length=120)
    points = models.IntegerField()

    def _str_(self):
        return self.title