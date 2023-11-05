from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from memory_game import views as memoryGameViews

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'memory_game', memoryGameViews.MemoryGameView)
router.register(r'users', memoryGameViews.UserView)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user_score/', memoryGameViews.MemoryGameViewUserScore.as_view()),
]

