from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Campos personalizados
    full_name = models.CharField(max_length=255, null=True, blank=True)  # Nome completo
    bio = models.TextField(null=True, blank=True)  # Biografia do usuário
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)  # Imagem de perfil
    birth_date = models.DateField(null=True, blank=True)  # Data de nascimento

    def __str__(self):
        return self.username
