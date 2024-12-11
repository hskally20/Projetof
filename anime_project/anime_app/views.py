import requests
from django.shortcuts import render


def index(request):
    page = request.GET.get('page', 1)
    genre = request.GET.get('genre', '')
    query = request.GET.get('query', '')
    season = request.GET.get('season', 'all')

    # URL base da API
    base_url = 'https://api.jikan.moe/v4/anime'
    
    params = {
        'page': page,
        'limit': 12,
    }

    if genre:
        params['genres'] = genre
    if query:
        params['q'] = query
    if season and season != 'all':
        params['season'] = season

    # Realiza a requisição para a API de animes
    response = requests.get(base_url, params=params)
    data = response.json()

    # Passa os dados para o template
    context = {
        'animes': data.get('data', []),
        'total_animes': data.get('pagination', {}).get('items', {}).get('total', 0),
        'current_page': page,
    }
    return render(request, 'index.html', context)

# Função para exibir detalhes de um anime
def anime_details(request, anime_id):
    base_url = f'https://api.jikan.moe/v4/anime/{anime_id}'

    response = requests.get(base_url)
    anime_data = response.json()

    context = {
        'anime': anime_data.get('data', {}),
    }
    return render(request, 'anime_app/anime_details.html', context)

# Função para exibir detalhes de um episódio
def episode_details(request, anime_id, episode_num):
    base_url = f'https://api.jikan.moe/v4/anime/{anime_id}/episodes/{episode_num}'

    response = requests.get(base_url)
    episode_data = response.json()

    context = {
        'episode': episode_data.get('data', {}),
        'anime_id': anime_id,
        'episode_num': episode_num,
    }
    return render(request, 'anime_app/episode_details.html', context)

def calendario(request):
    return render(request, 'calendario.html')

def novidades(request):
    return render(request, 'novidades.html')
def resultados(request):
    return render(request, 'resultados.html')