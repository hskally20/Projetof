from django.urls import path
from .views import register, login_view, logout_view, profile_update # Atualize os imports

urlpatterns = [
    path('register/', register, name='register'),            # URL para registro
    path('profile/update/', profile_update, name='profile_update'),   # Usando a função register
    path('login/', login_view, name='login'),      # Função login
    path('logout/', logout_view, name='logout'),   # Função logout
]
