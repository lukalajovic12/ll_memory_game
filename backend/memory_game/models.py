from django.db import models
from django.contrib.auth.models import User


class MemoryGame(models.Model):
    title = models.CharField(max_length=120)
    points = models.IntegerField()
    user_id = models.IntegerField()

    def _str_(self):
        return self.title