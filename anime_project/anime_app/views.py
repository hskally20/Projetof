import requests
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import Comment
import json

def load_comments(request):
    episode_id = request.GET.get('episode_id')
    
    # Obtém os comentários do banco de dados para o episódio específico
    comments = Comment.objects.filter(episode_id=episode_id).order_by('-created_at')
    
    # Serializa os dados para enviar ao frontend
    comments_data = [
        {
            'user_name': comment.user_name,
            'content': comment.content,
            'created_at': comment.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'id': comment.id,
        }
        for comment in comments
    ]
    
    return JsonResponse(comments_data, safe=False)

@csrf_exempt  # Decorador para desabilitar a verificação CSRF (apenas para testes ou use de forma mais segura com o CSRF token no frontend)
def add_comment(request):
    if request.method == 'POST':
        try:
            # Extrair dados do corpo da requisição
            import json
            data = json.loads(request.body)

            user_name = data.get('user_name')
            content = data.get('content')
            episode_id = data.get('episode_id')

            if not user_name or not content or not episode_id:
                return JsonResponse({'error': 'Todos os campos são obrigatórios'}, status=400)
            
            # Cria um novo comentário no banco de dados
            new_comment = Comment.objects.create(
                user_name=user_name,
                content=content,
                episode_id=episode_id
            )
            return JsonResponse({'success': 'Comentário adicionado com sucesso'}, status=201)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Método não permitido'}, status=405)
# Função para exibir a página inicial com a lista de animes
def index(request):
    page = request.GET.get('page', 1)
    genre = request.GET.get('genre', '')
    query = request.GET.get('query', '')
    season = request.GET.get('season', 'all')

    # URL base da API Jikan
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
# Função para exibir detalhes de um anime
def anime_details(request, anime_id):
    anime_url = f'https://api.jikan.moe/v4/anime/{anime_id}'
    episodes_url = f'https://api.jikan.moe/v4/anime/{anime_id}/episodes'

    try:
        # Requisição para obter detalhes do anime
        anime_response = requests.get(anime_url)
        episodes_response = requests.get(episodes_url)
        anime_data = anime_response.json().get('data', {})
        episodes_data = episodes_response.json().get('data', [])
    except Exception as e:
        print(f"Erro ao carregar dados do anime: {e}")
        anime_data, episodes_data = {}, []

    context = {
        'anime': anime_data,
        'episodes': episodes_data,
    }
    return render(request, 'animes_details.html', context)


# Função para exibir detalhes de um episódio
   


# Função para exibir o calendário
def calendario(request):
    return render(request, 'calendario.html')

# Função para exibir novidades
def novidades(request):
    return render(request, 'novidades.html')

# Função para exibir os resultados de pesquisa de animes
def resultados(request):
    query = request.GET.get('query', '')
    if query:
        try:
            # Requisição à API para buscar animes
            response = requests.get(f'https://api.jikan.moe/v4/anime?q={query}&page=1')
            data = response.json()
            animes = data.get('data', [])
        except Exception as e:
            animes = []
            print(f"Erro ao buscar dados da API: {e}")
    else:
        animes = []

    return render(request, 'resultados.html', {'animes': animes, 'query': query})

def episode_player(request, anime_id, episode_id):
    # URLs da API para obter dados do anime e do episódio
    anime_url = f'https://api.jikan.moe/v4/anime/{anime_id}'
    episode_url = f'https://api.jikan.moe/v4/anime/{anime_id}/episodes/{episode_id}'

    try:
        # Requisições para obter os dados
        anime_response = requests.get(anime_url)
        episode_response = requests.get(episode_url)

        # Verifica se ambas as requisições foram bem-sucedidas
        if anime_response.status_code == 200 and episode_response.status_code == 200:
            anime_data = anime_response.json().get('data', {})
            episode_data = episode_response.json().get('data', {})

            # Extraindo informações necessárias
            anime_title = anime_data.get('title', 'Título não disponível')
            episode_title = episode_data.get('title', f'Episódio {episode_id}')
            episode_description = episode_data.get('synopsis', 'Descrição não disponível')

            # Verifica se 'aired' é um dicionário e se tem a chave 'string'
            episode_aired = episode_data.get('aired', {})
            if isinstance(episode_aired, dict):
                episode_aired = episode_aired.get('string', 'Data não disponível')
            else:
                episode_aired = 'Data não disponível'

            # Obtendo o vídeo do YouTube, se existir
            youtube_video_id = None
            promotion_videos = episode_data.get('videos', {}).get('promotion', [])
            if promotion_videos and isinstance(promotion_videos, list) and len(promotion_videos) > 0:
                youtube_video_id = promotion_videos[0].get('youtube_id', None)

            # Passando as variáveis para o template
            context = {
                'anime_title': anime_title,
                'episode_title': episode_title,
                'episode_description': episode_description,
                'episode_aired': episode_aired,
                'youtube_video_id': youtube_video_id,
                'episode_number': episode_id,
            }

            return render(request, 'tela_anime.html', context)
        
        else:
            # Em caso de erro na API, redireciona para página de erro personalizada
            return render(request, '404.html', {'error_message': 'Dados não encontrados ou erro na API.'})

    except requests.exceptions.RequestException as e:
        # Lidar com erros de rede ou falhas na requisição
        return render(request, '404.html', {'error_message': f'Ocorreu um erro ao buscar os dados: {e}'})
