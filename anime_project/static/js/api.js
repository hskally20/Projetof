// Variáveis globais
let allAnimes = [], totalAnimes = 0, currentPage = 1;
const animesPerPage = 12;

// Função para carregar animes
async function loadAnimes(params = {}) {
  let url = new URL('https://api.jikan.moe/v4/anime');
  url.searchParams.set('page', params.page || currentPage);
  url.searchParams.set('limit', animesPerPage);

  if (params.season && params.season !== 'all') url.searchParams.set('season', params.season);
  if (params.genre) url.searchParams.set('genres', params.genre);
  if (params.query) url.searchParams.set('q', params.query);

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data?.data) {
      allAnimes = data.data;
      totalAnimes = data.pagination.items.total;
      renderAnimes();
      renderPagination();
    } else {
      throw new Error('Nenhum anime encontrado.');
    }
  } catch (error) {
    console.error('Erro ao carregar animes:', error);
  }
}

// Função para renderizar animes
function renderAnimes() {
  const container = document.getElementById('anime-container');
  if (!container) return console.error('#anime-container não encontrado');

  container.innerHTML = allAnimes.length
    ? allAnimes.map(anime => `
      <div class="col-md-3 mb-4">
        <div class="anime-card">
          <a href="/anime/${anime.mal_id}/" class="card">
            <img src="${anime.images.jpg.image_url}" class="card-img-top anime-img" alt="${anime.title}">
            <div class="card-content">
              <h5 class="card-title">${anime.title}</h5>
            </div>
          </a>
        </div>
      </div>`).join('')
    : '<p class="text-center">Nenhum anime encontrado.</p>';
}

// Função para renderizar paginação
function renderPagination() {
  const pagination = document.querySelector('#pagination .pagination');
  pagination.innerHTML = '';

  const pageCount = Math.ceil(totalAnimes / animesPerPage);

  pagination.append(createPaginationItem('Anterior', currentPage > 1, () => {
    if (currentPage > 1) loadAnimes({ page: --currentPage });
  }));

  pagination.append(createPaginationItem(`${currentPage}`, false, null, true));

  pagination.append(createPaginationItem('Próximo', currentPage < pageCount, () => {
    if (currentPage < pageCount) loadAnimes({ page: ++currentPage });
  }));
}

function createPaginationItem(label, enabled, onClick, active = false) {
  const li = document.createElement('li');
  li.className = `page-item${!enabled ? ' disabled' : ''}${active ? ' active' : ''}`;
  li.innerHTML = `<a class="page-link" href="#">${label}</a>`;
  if (onClick) li.querySelector('a').addEventListener('click', event => {
    event.preventDefault();
    onClick();
  });
  return li;
}

// Função para carregar detalhes de anime e episódios
async function loadAnimeDetails() {
  const params = new URLSearchParams(window.location.search);
  const animeId = params.get('id');
  if (!animeId) return alert('ID do anime não encontrado!');

  try {
    const [animeData, episodesData] = await Promise.all([
      fetchJson(`https://api.jikan.moe/v4/anime/${animeId}`),
      fetchJson(`https://api.jikan.moe/v4/anime/${animeId}/episodes`)
    ]);

    renderAnimeDetails(animeData.data, episodesData.data);
  } catch (error) {
    console.error('Erro ao carregar detalhes do anime:', error);
  }
}

function renderAnimeDetails(anime, episodes) {
  const details = document.getElementById('anime-details');
  if (!details) return;

  details.innerHTML = `
    <div class="card">
      <img src="${anime.images.jpg.large_image_url}" class="card-img-top img-fluid" alt="${anime.title}">
      <div class="card-body">
        <h5 class="card-title">${anime.title}</h5>
        <p class="card-text">${anime.synopsis || 'Descrição não disponível'}</p>
        <p><strong>Lançamento:</strong> ${anime.aired?.prop?.from?.string || 'Não informado'}</p>
        <p><strong>Gêneros:</strong> ${anime.genres.map(genre => genre.name).join(', ') || 'Não disponível'}</p>
      </div>
    </div>
    <h1 class="mt-4">Episódios</h1>
    <ul class="list-group" id="episode-list">
      ${episodes.length
        ? episodes.map(ep => `
          <li class="list-group-item">
            <strong>Ep. ${ep.mal_id}</strong>: ${ep.title || 'Sem título'}
            <a href="{% url 'episode_player' anime_id=anime_id episode_id=episode_id %} class="btn btn-sm btn-danger float-end">Assistir</a>
          </li>`).join('')
        : '<li class="list-group-item">Não há episódios disponíveis.</li>'}
    </ul>`;
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro na requisição');
  return response.json();
}

// Inicializa a aplicação
function init() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('id')) {
    loadAnimeDetails();
  } else {
    loadAnimes({
      genre: params.get('genre'),
      query: params.get('query'),
      season: params.get('season'),
      page: currentPage
    });
  }
}

document.addEventListener('DOMContentLoaded', init);
