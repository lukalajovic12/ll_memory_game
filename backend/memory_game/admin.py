from django.contrib import admin

from .models import MemoryGame

class MemoryGameAdmin(admin.ModelAdmin):
    list_display = ('title', 'points')

# Register your models here.

admin.site.register(MemoryGame, MemoryGameAdmin)