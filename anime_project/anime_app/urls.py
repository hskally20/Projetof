from django.urls import path
from . import views

urlpatterns = [
    path('calendario/', views.calendario, name='calendario'),
    path('novidades/', views.novidades, name='novidades'),
    path('', views.index, name='index'),
    path('anime/<int:anime_id>/', views.anime_details, name='anime_details'),
]
