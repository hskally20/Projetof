from django.contrib.auth.models import AbstractUser
from django.db import models




class Comment(models.Model):
    user_name = models.CharField(max_length=100)  # Nome do usuário que comentou
    content = models.TextField()  # Conteúdo do comentário
    episode_id = models.IntegerField()  # Referência ao episódio
    created_at = models.DateTimeField(auto_now_add=True)  # Data de criação
    updated_at = models.DateTimeField(auto_now=True)  # Data de atualização

    def __str__(self):
        return f'{self.user_name} - {self.content[:30]}'