from django.contrib import admin

from .models import MemoryGame,GameSettings

class MemoryGameAdmin(admin.ModelAdmin):
    list_display = ('title', 'points')

class GameSettingsAdmin(admin.ModelAdmin):
    list_display = ('title', 'lives')
# Register your models here.

admin.site.register(MemoryGame, MemoryGameAdmin)

admin.site.register(GameSettings, GameSettingsAdmin)