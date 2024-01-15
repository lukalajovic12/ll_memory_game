from django.contrib import admin

from .models import MemoryGame,GameSettings

class MemoryGameAdmin(admin.ModelAdmin):
    list_display = ('title', 'points','user','settings')

class GameSettingsAdmin(admin.ModelAdmin):
    list_display = ('title', 'lives','startLevel','mistakes','user')
# Register your models here.

admin.site.register(MemoryGame, MemoryGameAdmin)

admin.site.register(GameSettings, GameSettingsAdmin)