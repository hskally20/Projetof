// Declare as variáveis fora de qualquer função para garantir que não sejam redeclaradas
let allAnimes = [];    // Declaração da variável global para os animes
let totalAnimes = 0;   // Total de animes
let currentPage = 1;   // Página atual
const animesPerPage = 10;  // Quantidade de animes por página

// Função principal para carregar os animes
async function loadAnimes() {
  const url = `https://api.jikan.moe/v4/anime?page=${currentPage}&limit=${animesPerPage}`;

  try {
    const response = await fetch(url);

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText} (status: ${response.status})`);
    }

    const data = await response.json();
    console.log("Resposta da API:", data);

    // Verifica se os dados estão presentes
    if (data && data.data) {
      allAnimes = data.data;  // Atualiza a variável global com os animes
      totalAnimes = data.pagination.items.total; // Total de animes disponíveis
      renderAnimes();  // Renderiza os animes
      renderPagination();  // Renderiza a navegação de páginas
    } else {
      throw new Error('Nenhum dado encontrado na resposta da API.');
    }
  } catch (error) {
    console.error('Erro ao buscar os animes:', error);
    alert('Não foi possível carregar os animes. Por favor, verifique o console para mais detalhes.');
  }
}

// Função para renderizar os animes na tela
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
