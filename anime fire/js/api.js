// Variáveis globais para controle de animes e paginação
let allAnimes = [];    // Lista de animes
let totalAnimes = 0;   // Total de animes
let currentPage = 1;   // Página atual
const animesPerPage = 12;  // Quantidade de animes por página

// Função para carregar animes de acordo com o gênero, pesquisa, ou temporada
async function loadAnimes(queryParams = null) {
  let url = 'https://api.jikan.moe/v4/anime';

  // Se o filtro de temporada ou pesquisa estiver presente nos parâmetros, montamos a URL corretamente
  if (queryParams) {
    const { genre, query, season, page } = queryParams;

    if (season && season !== 'all') {
      url += `?season=${season}&page=${page}&limit=${animesPerPage}`;
    } else if (genre) {
      url += `?genres=${genre}&page=${page}&limit=${animesPerPage}`;
    } else if (query) {
      url += `?q=${query}&page=${page}&limit=${animesPerPage}`;
    }
  } else {
    url += `?page=${currentPage}&limit=${animesPerPage}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data && data.data) {
      allAnimes = data.data;
      totalAnimes = data.pagination.items.total;
      renderAnimes(); // Renderiza os animes
      renderPagination(); // Renderiza a navegação de páginas
    } else {
      throw new Error('Nenhum anime encontrado na resposta da API.');
    }
  } catch (error) {
    console.error('Erro ao buscar os animes:', error);
  }
}

// Função para renderizar os animes na tela
function renderAnimes() {
  const animeContainer = document.getElementById('anime-container'); // Agora usa 'anime-container'

  if (!animeContainer) {
    console.error('Elemento #anime-container não encontrado');
    return;
  }

  animeContainer.innerHTML = ''; // Limpa o container

  if (allAnimes && allAnimes.length > 0) {
    allAnimes.forEach(anime => {
      const card = document.createElement('div');
      card.className = 'col-md-3 mb-4'; // Card ocupará 3 colunas
      card.innerHTML = `
        <div class="anime-card">
          <a href="lista-ep.html?id=${anime.mal_id}" class="card">
            <img src="${anime.images.jpg.image_url}" class="card-img-top anime-img" alt="${anime.title}">
            <div class="card-content">
              <h5 class="card-title">${anime.title}</h5>
            </div>
          </a>
        </div>
      `;
      animeContainer.appendChild(card);
    });
  } else {
    animeContainer.innerHTML = '<p class="text-center">Nenhum anime encontrado.</p>';
  }
}

function renderAnimes() {
    const animeContainer = document.getElementById('anime-container');
    if (!animeContainer) {
      console.error('Elemento #anime-container não encontrado');
      return;
    }
  
    animeContainer.innerHTML = '';  // Limpa o container
  
    if (allAnimes && allAnimes.length > 0) {
      allAnimes.forEach(anime => {
        const card = document.createElement('div');
        card.className = 'col-md-3 mb-4';  // Card ocupará 3 colunas
        card.innerHTML = `
          <div class="anime-card">
            <a href="lista-ep.html?id=${anime.mal_id}" class="card">
              <img src="${anime.images.jpg.image_url}" class="card-img-top anime-img" alt="${anime.title}">
              <div class="card-content">
                <h5 class="card-title">${anime.title}</h5>
                <p class="card-text">Novos episódios disponíveis!</p>
              </div>
            </a>
          </div>
        `;
        animeContainer.appendChild(card);
      });
    } else {
      animeContainer.innerHTML = '<p class="text-center">Nenhum anime encontrado.</p>';
    }
  }
  
  // Função para renderizar a paginação
  function renderPagination() {
    const paginationElement = document.getElementById('pagination').querySelector('.pagination');
    paginationElement.innerHTML = '';  // Limpa a paginação anterior
  
    const pageCount = Math.ceil(totalAnimes / animesPerPage);  // Total de páginas
  
    // Botão "Anterior"
    const prevItem = document.createElement('li');
    prevItem.className = 'page-item' + (currentPage === 1 ? ' disabled' : '');
    prevItem.innerHTML = `<a class="page-link" href="#">Anterior</a>`;
    prevItem.addEventListener('click', (event) => {
      event.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        loadAnimes();  // Carrega os animes da página anterior
      }
    });
    paginationElement.appendChild(prevItem);
  
    // Número da página atual
    const pageItem = document.createElement('li');
    pageItem.className = 'page-item active';
    pageItem.innerHTML = `<a class="page-link" href="#">${currentPage}</a>`;
    paginationElement.appendChild(pageItem);
  
    // Botão "Próximo"
    const nextItem = document.createElement('li');
    nextItem.className = 'page-item' + (currentPage === pageCount ? ' disabled' : '');
    nextItem.innerHTML = `<a class="page-link" href="#">Próximo</a>`;
    nextItem.addEventListener('click', (event) => {
      event.preventDefault();
      if (currentPage < pageCount) {
        currentPage++;
        loadAnimes();  // Carrega os animes da próxima página
      }
    });
    paginationElement.appendChild(nextItem);
  }
  
  // Asegura que o DOM está completamente carregado antes de rodar o script
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente carregado');
    loadAnimes();  // Carrega os animes assim que o DOM estiver pronto
  });

// Função para pegar os parâmetros da URL
function getQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    genre: urlParams.get('genre'),
    query: urlParams.get('query'),
    season: urlParams.get('season'),
    page: currentPage,
  };
}

// Função chamada ao realizar uma pesquisa (formulário)
function searchAnimes(event) {
  event.preventDefault(); // Previne o envio do formulário

  const query = document.querySelector('input[name="query"]').value; // Obtém o valor da pesquisa
  if (query.trim()) {
    // Redireciona para a página de resultados com a query na URL
    window.location.href = `resultados.html?query=${encodeURIComponent(query)}`;
  }
}

// Função chamada ao filtrar por gênero
function filterByGenre(genre) {
  // Redireciona para a página de resultados com o gênero na URL
  window.location.href = `resultados.html?genre=${encodeURIComponent(genre)}`;
}

// Função chamada ao filtrar por temporada
function filterBySeason(season) {
  // Redireciona para a página de resultados com a temporada na URL
  window.location.href = `resultados.html?season=${encodeURIComponent(season)}`;
}

// Função para carregar os detalhes do anime e seus episódios
async function loadAnimeDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const animeId = urlParams.get('id');

  if (!animeId) {
    alert('ID do anime não encontrado na URL!');
    return;
  }

  try {
    // Faz as requisições para pegar o anime e os episódios
    const animeUrl = `https://api.jikan.moe/v4/anime/${animeId}`;
    const episodesUrl = `https://api.jikan.moe/v4/anime/${animeId}/episodes`;

    const [animeResponse, episodesResponse] = await Promise.all([
      fetch(animeUrl),
      fetch(episodesUrl)
    ]);

    const animeData = await animeResponse.json();
    const episodesData = await episodesResponse.json();

    // Renderizar detalhes do anime
    const animeDetailsContainer = document.getElementById('anime-details');
    animeDetailsContainer.innerHTML = `
      <div class="card">
        <img src="${animeData.data.images.jpg.large_image_url}" class="card-img-top img-fluid" alt="${animeData.data.title}" style="max-width: 100%;">
        <div class="card-body">
          <h5 class="card-title">${animeData.data.title}</h5>
          <p class="card-text">${animeData.data.synopsis}</p>
        </div>
      </div>
      <h3 class="mt-4>Episódios</h3>
      <ul class="list-group" id="episode-list"></ul>
    `;

    // Renderizar episódios
    const episodeList = document.getElementById('episode-list');
    episodesData.data.forEach(episode => {
      const episodeItem = document.createElement('li');
      episodeItem.className = 'list-group-item';
      episodeItem.innerHTML = `
        <strong>Ep. ${episode.mal_id}</strong>: ${episode.title}
        <a href="tela_anime.html?id=${animeId}&episode=${episode.mal_id}" class="btn btn-sm btn-primary float-end">Assistir</a>
      `;
      episodeList.appendChild(episodeItem);
    });

    // Carregar animes semelhantes
    loadSimilarAnimes(animeId);

  } catch (error) {
    console.error('Erro ao carregar os detalhes do anime:', error);
    alert('Não foi possível carregar os detalhes do anime.');
  }
}

// Função para carregar animes semelhantes
async function loadSimilarAnimes(animeId) {
  const url = `https://api.jikan.moe/v4/anime/${animeId}/related`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.data) {
      renderSimilarAnimes(data.data);
    } else {
      console.error('Nenhum anime semelhante encontrado.');
    }
  } catch (error) {
    console.error('Erro ao carregar animes semelhantes:', error);
    alert('Não foi possível carregar os animes semelhantes.');
  }
}

// Função para renderizar animes semelhantes


// Inicializa a página de animes
document.addEventListener('DOMContentLoaded', () => {
  loadAnimes(getQueryParams()); // Carrega os animes ao carregar a página
});

// ========================  tela de reprodução ======================= 

async function loadEpisodeDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const animeId = urlParams.get('id'); // Pega o ID do anime
  const episodeNum = urlParams.get('episode'); // Pega o número do episódio

  // Verifica se o animeId ou episodeNum são inválidos
  if (!animeId || !episodeNum) {
    
    return;
  }

  try {
    // Requisições para os detalhes do anime, episódio e vídeos
    const animeUrl = `https://api.jikan.moe/v4/anime/${animeId}`;
    const episodeUrl = `https://api.jikan.moe/v4/anime/${animeId}/episodes/${episodeNum}`;
    const episodeVideosUrl = `https://api.jikan.moe/v4/anime/${animeId}/videos/episodes`;

    const [animeResponse, episodeResponse, videosResponse] = await Promise.all([
      fetch(animeUrl),
      fetch(episodeUrl),
      fetch(episodeVideosUrl)
    ]);

    // Verifica se as respostas da API são válidas
    if (!animeResponse.ok || !episodeResponse.ok || !videosResponse.ok) {
      throw new Error('Erro ao carregar os dados da API');
    }

    const animeData = await animeResponse.json();
    const episodeData = await episodeResponse.json();
    const videosData = await videosResponse.json();

    // Carregar informações do anime
    const animeName = document.getElementById('anime-name');
    animeName.textContent = animeData.data.title;

    // Carregar informações do episódio
    const episodeName = document.getElementById('episode-name');
    episodeName.textContent = `Episódio ${episodeData.data.title}`;

    const episodeDescription = document.getElementById('episode-description');
    episodeDescription.textContent = episodeData.data.synopsis;

    const episodeAired = document.getElementById('episode-aired');
    episodeAired.textContent = `Exibido em: ${episodeData.data.aired}`;

    // Exibe o player de vídeo com a URL do episódio
    const videoContainer = document.getElementById('video-container');

    // Verificar se a resposta de vídeos está vazia
    if (videosData.data.episodes && videosData.data.episodes.length > 0) {
      // Procurar o vídeo do episódio (se disponível)
      const episodeVideo = videosData.data.episodes.find(video => video.episode === parseInt(episodeNum));

      if (episodeVideo && episodeVideo.url) {
        // Exibe o vídeo usando a URL fornecida pela API
        videoContainer.innerHTML = `<video controls><source src="${episodeVideo.url}" type="video/mp4"></video>`;
      } else {
        // Caso o vídeo não seja encontrado, incorpora o link do YouTube
        const youtubeSearchQuery = encodeURIComponent(animeData.data.title + " episódio " + episodeNum);
        const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeSearchQuery}`;
        videoContainer.innerHTML = `
          <p>Vídeo não disponível para este episódio. Tente assistir no YouTube:</p>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeSearchQuery}" 
                  title="YouTube video player" frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
          </iframe>
        `;
      }
    } else {
      // Caso não haja vídeos disponíveis
      const youtubeSearchQuery = encodeURIComponent(animeData.data.title + " episódio " + episodeNum);
      videoContainer.innerHTML = `
        <p>Vídeo não disponível para este episódio. Tente assistir no YouTube:</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeSearchQuery}" 
                title="YouTube video player" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe>
      `;
    }

    // Configurar os botões de navegação entre episódios
    const prevEpisodeBtn = document.getElementById('prevEpisode');
    const nextEpisodeBtn = document.getElementById('nextEpisode');
    const episodeListBtn = document.getElementById('episodeList');

    const prevEpisodeNum = parseInt(episodeNum) - 1;
    const nextEpisodeNum = parseInt(episodeNum) + 1;

    // Verificar se os episódios anteriores ou seguintes existem
    prevEpisodeBtn.onclick = () => {
      window.location.href = `tela_anime.html?id=${animeId}&episode=${prevEpisodeNum}`;
    };
    nextEpisodeBtn.onclick = () => {
      window.location.href = `tela_anime.html?id=${animeId}&episode=${nextEpisodeNum}`;
    };
    episodeListBtn.onclick = () => {
      window.location.href = `lista-ep.html?id=${animeId}`;
    };
  } catch (error) {
    console.error('Erro ao carregar os detalhes do episódio:', error);
    alert('Não foi possível carregar os detalhes do episódio.');
  }
}

document.addEventListener('DOMContentLoaded', loadEpisodeDetails);