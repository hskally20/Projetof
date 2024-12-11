from django.urls import path
from . import views

urlpatterns = [
    path('calendario/', views.calendario, name='calendario'),
    path('novidades/', views.novidades, name='novidades'),
    path('resultados/', views.resultados, name='resultados'),
    path('lista-ep/<int:anime_id>/<int:episode_num>/', views.episode_details, name='episode_details'),
    path('', views.index, name='index'),
    path('anime/<int:anime_id>/', views.anime_details, name='anime_details'),
      path('anime/<int:anime_id>/episode/<int:episode_id>/', views.episode_player, name='episode_player'),
]
