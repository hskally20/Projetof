from django.urls import path
from . import views

urlpatterns = [
    path('calendario/', views.calendario, name='calendario'),
    path('novidades/', views.novidades, name='novidades'),
    path('resultados/', views.resultados, name='resultados'),
    path('', views.index, name='index'),
    path('load_comments/', views.load_comments, name='load_comments'),

    path('add_comment/', views.add_comment, name='add_comment'),
    path('anime/<int:anime_id>/', views.anime_details, name='anime_details'),
    path('anime/<int:anime_id>/episode/<int:episode_id>/', views.episode_player, name='episode_player'),

  
]
