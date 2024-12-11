from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('', views.index, name='index'),
    path('anime/<int:anime_id>/', views.anime_details, name='anime_details'),
]
