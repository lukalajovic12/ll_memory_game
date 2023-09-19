from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from memory_game import views as memoryGameViews

router = routers.DefaultRouter()
router.register(r'memory_game', memoryGameViews.MemoryGameView, 'memory_game')
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]