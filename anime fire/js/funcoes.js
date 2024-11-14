// JavaScript para interações futuras, como carrossel ou funcionalidades adicionais

document.addEventListener("DOMContentLoaded", function() {
    console.log("Página carregada!");
  
    // Função para o botão de pesquisa (exemplo)
    const searchButton = document.querySelector('button');
    const searchInput = document.querySelector('input[type="text"]');
    
    searchButton.addEventListener('click', function() {
      const searchQuery = searchInput.value;
      alert(`Buscando por: ${searchQuery}`);
      // Aqui você pode adicionar código para buscar animes ou realizar outras ações
    });
  });

function toggleGenreList() {
  const overlay = document.getElementById('genreOverlay');
  overlay.style.display = 'flex';  // Exibe o overlay
}

function closeGenreList() {
  const overlay = document.getElementById('genreOverlay');
  overlay.style.display = 'none';  // Oculta o overlay
}

 


  // Dados dos animes
  const animeData = {
  "rezero": {
    "title": "Re:Zero - Starting Life in Another World",
    "description": "Natsuki Subaru, um adolescente comum, conhece uma linda garota de cabelos prateados vinda de outro mundo. Subaru quer ficar ao lado dela, mas o fardo que ela carrega é maior do que Subaru pode imaginar.",
    "episodes": [
      {
        "number": 1,
        "title": "O Início do Poder",
        "description": "A história de Ryoma começa em seu novo mundo, enquanto ele explora suas habilidades mágicas e encontra novos amigos.",
        "releaseDate": "01/10/2024",
        "videoUrl": "https://www.youtube.com/embed/video-rezero-1"
      },
      {
        "number": 2,
        "title": "A Luta Pela Sobrevivência",
        "description": "Ryoma e seus amigos enfrentam um inimigo misterioso que ameaça a paz em sua nova casa.",
        "releaseDate": "08/10/2024",
        "videoUrl": "https://www.youtube.com/embed/video-rezero-2"
      },
      {
        "number": 3,
        "title": "O Poder Se Revela",
        "description": "Com uma batalha intensa, Ryoma descobre a verdadeira extensão de seus poderes e seus novos aliados.",
        "releaseDate": "15/10/2024",
        "videoUrl": "https://www.youtube.com/embed/video-rezero-3"
      },
      {
        "number": 4,
        "title": "A Decisão Final",
        "description": "Enquanto uma ameaça maior surge, Ryoma precisa fazer escolhas difíceis para proteger aqueles que ama.",
        "releaseDate": "22/10/2024",
        "videoUrl": "https://www.youtube.com/embed/video-rezero-4"
      }
    ]
  },
  "seirei-gensouki": {
    "title": "Seirei Gensouki 2",
    "description": "A história de Ryoma começa em seu novo mundo, enquanto ele explora suas habilidades mágicas e encontra novos amigos.",
    "episodes": [
      {
        "number": 1,
        "title": "O Início do Poder",
        "description": "A história de Ryoma começa em seu novo mundo, enquanto ele explora suas habilidades mágicas e encontra novos amigos.",
        "releaseDate": "01/10/2024",
        "videoUrl": "https://www.youtube.com/embed/video-seirei-1"
      },
      {
        "number": 2,
        "title": "A Luta Pela Sobrevivência",
        "description": "Ryoma e seus amigos enfrentam um inimigo misterioso que ameaça a paz em sua nova casa.",
        "releaseDate": "08/10/2024",
        "videoUrl": "https://www.youtube.com/embed/video-seirei-2"
      },
      {
        "number": 3,
        "title": "O Poder Se Revela",
        "description": "Com uma batalha intensa, Ryoma descobre a verdadeira extensão de seus poderes e seus novos aliados.",
        "releaseDate": "15/10/2024",
        "videoUrl": "https://www.youtube.com/embed/video-seirei-3"
      },
      {
        "number": 4,
        "title": "A Decisão Final",
        "description": "Enquanto uma ameaça maior surge, Ryoma precisa fazer escolhas difíceis para proteger aqueles que ama.",
        "releaseDate": "22/10/2024",
        "videoUrl": "https://www.youtube.com/embed/video-seirei-4"
      }
    ]
  },
  "dragon-ball-daima": {
    "title": "Dragon Ball DAIMA",
    "description": "Relembrando a saga dos Saiyajins!",
    "episodes": [
      {
        "number": 1,
        "title": "O Retorno dos Saiyajins",
        "description": "Após anos de paz, Goku e seus amigos devem enfrentar novos inimigos e rever velhos rostos da sua infância. O legado dos Saiyajins está mais vivo do que nunca!",
        "releaseDate": "01/10/2024",
        "videoUrl": "video/DBZB.mp4 "
      },
      {
        "number": 2,
        "title": "A Força do Super Saiyajin",
        "description": "Goku treina arduamente para alcançar o novo nível de poder. Enquanto isso, novos rivais surgem no horizonte, buscando derrubar o herói.",
        "releaseDate": "08/10/2024",
        "videoUrl": "https://www.youtube.com/embed/video-dragonball-2"
      },
      {
        "number": 3,
        "title": "Confronto com Vegeta",
        "description": "Goku e Vegeta se enfrentam em uma batalha épica. O destino do universo está em jogo e apenas o mais forte sairá vitorioso.",
        "releaseDate": "15/10/2024",
        "videoUrl": "https://www.youtube.com/embed/video-dragonball-3"
      },
      {
        "number": 4,
        "title": "O Poder dos Saiyajins",
        "description": "Goku, Vegeta e seus aliados se unem para enfrentar uma ameaça desconhecida. No entanto, a verdadeira força dos Saiyajins está prestes a ser revelada.",
        "releaseDate": "22/10/2024",
        "videoUrl": "https://www.youtube.com/embed/video-dragonball-4"
      }
    ]
  },
  "bleach": {
    "title": "Bleach: Sennen Kessen-hen",
    "description": "Últimos episódios da série!",
    "episodes": [
      {
        "number": 1,
        "title": "O Novo Início",
        "description": "Os antigos guerreiros de Bleach se preparam para o último e mais épico confronto contra os novos inimigos que ameaçam o mundo.",
        "releaseDate": "05/10/2024",
        "videoUrl": "https://www.youtube.com/embed/video-bleach-1"
      },
      {
        "number": 2,
        "title": "A Guerra Final",
        "description": "Os maiores confrontos entre Shinigamis e Quincies estão prestes a acontecer. Tudo está em jogo neste último arco de Bleach!",
        "releaseDate": "12/10/2024",
        "videoUrl": "https://www.youtube.com/embed/video-bleach-2"
      }
    ]
  }
}


  // Obter parâmetros da URL (anime e episódio)
  const urlParams = new URLSearchParams(window.location.search);
  const animeId = urlParams.get('anime'); // Exemplo: 'rezero', 'seirei-gensouki'
  const episodeNumber = parseInt(urlParams.get('episode')); // Exemplo: '1', '2'
  const query = urlParams.get('query');
  const resultadosDiv = document.getElementById('resultados');
  
  if (query) {
      // Simulação de resultados - substitua isso com a lógica real de busca
      resultadosDiv.innerHTML = `<p>Você pesquisou por: <strong>${query}</strong></p>`;
      // Aqui você pode adicionar lógica para exibir resultados reais.
  } else {
    const resultadosDiv = document.getElementById('resultados');

  }
  // Verificar se o anime e o episódio existem
  if (animeData[animeId] && animeData[animeId].episodes[episodeNumber - 1]) {
    const anime = animeData[animeId];
    const episode = anime.episodes[episodeNumber - 1];

    // Atualizar título do anime e título do episódio
    document.getElementById('anime-name').textContent = anime.title;
    document.getElementById('episodes-title').textContent = `Episódio ${episode.number}`;

    // Atualizar descrição e data de lançamento
    document.getElementById('episode-description').textContent = episode.description;

    // Atualizar o vídeo
    document.getElementById('video-frame').innerHTML = `<iframe src="${episode.videoUrl}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;

    // Atualizar botões de navegação
    const prevButton = document.getElementById('prevEpisode');
    const nextButton = document.getElementById('nextEpisode');
    const listButton = document.getElementById('episodeList');

    if (episodeNumber > 1) {
      prevButton.onclick = () => { location.href = `tela_anime.html?anime=${animeId}&episode=${episodeNumber - 1}`; };
    } else {
      prevButton.disabled = true;
    }

    if (episodeNumber < anime.episodes.length) {
      nextButton.onclick = () => { location.href = `tela_anime.html?anime=${animeId}&episode=${episodeNumber + 1}`; };
    } else {
      nextButton.disabled = true;
    }

    listButton.onclick = () => { location.href = 'anime-'+ animeId +'.html'; }; // Mudar conforme necessário
  } else {
    console.error('Anime ou episódio não encontrado.');
  }
  document.addEventListener('DOMContentLoaded', function () {
    const animes = {
        "rezero": {
            "title": "Re:Zero - Starting Life in Another World",
            "description": "Novos episódios disponíveis!",
            "image": "img/rezero.jfif",
            "episodesLink": "rezero.html",
            "episodes": []
        },
        "seirei-gensouki": {
            "title": "Seirei Gensouki 2",
            "description": "Novos episódios esta semana!",
            "image": "img/seireigensouki.webp",
            "episodesLink": "anime-seirei-gensouki.html",
            "episodes": []
        },
        "dragon-ball-daima": {
            "title": "Dragon Ball DAIMA",
            "description": "Relembrando a saga dos Saiyajins!",
            "image": "img/dragonball-novidades.webp",
            "episodesLink": "anime-dragon-ball-daima.html",
            "episodes": []
        },
        "bleach": {
            "title": "Bleach: Sennen Kessen-hen",
            "description": "Últimos episódios da série!",
            "image": "img/bleach-novidades.webp",
            "episodesLink": "anime-bleach.html",
            "episodes": []
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query').toLowerCase();
    const resultadosDiv = document.getElementById('resultados');
    const detalhesDiv = document.getElementById('detalhes'); // Div para detalhes do anime
    let resultadosEncontrados = false;

    for (const key in animes) {
        const anime = animes[key];
        // Verifica apenas o título
        if (anime.title.toLowerCase().includes(query)) {
            resultadosEncontrados = true;
            resultadosDiv.innerHTML += `
                <div class="card mb-3 anime-card" onclick="mostrarDetalhes('${key}')">
                    <div>
                        <a href="${anime.episodesLink}" class="card-title">${anime.title}</a>
                        <p class="card-text">${anime.description}</p>
                        <img src="${anime.image}" alt="${anime.title}" class="img-fluid">
                        <h6>Episódios:</h6>
                        <ul>
                            ${anime.episodes.map(ep => `<li>${ep.title}</li>`).join('')}
                        </ul>
                        <a href="${anime.episodesLink}" class="btn btn-primary">Ver Lista de Episódios</a>
                    </div>
                </div>
            `;
        }
    }

    if (!resultadosEncontrados) {
        resultadosDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
    }

    // Função para mostrar detalhes do anime
    window.mostrarDetalhes = function(key) {
        const anime = animes[key];
        detalhesDiv.innerHTML = `
            <h2>${anime.title}</h2>
            <img src="${anime.image}" alt="${anime.title}" class="img-fluid">
            <p>${anime.description}</p>
            <a href="${anime.episodesLink}" class="btn btn-primary">Ver Lista de Episódios</a>
        `;
    }
});
document.addEventListener("DOMContentLoaded", function() {
  const seasonFilter = document.getElementById('seasonFilter');
  const episodeList = document.getElementById('episodeList');
  const episodeItems = episodeList.getElementsByClassName('list-group-item');

  seasonFilter.addEventListener('change', function() {
      const selectedSeason = this.value;

      // Mostrar todos os itens se "Selecione uma temporada" for escolhido
      for (let item of episodeItems) {
          if (selectedSeason === "Selecione uma temporada") {
              item.style.display = "block"; // Mostra todos
          } else {
              item.style.display = item.dataset.season === selectedSeason ? "block" : "none"; // Filtra
          }
      }
  });
});

const seasonFilter = document.getElementById('seasonFilter');
const episodes = document.querySelectorAll('.episode');

seasonFilter.addEventListener('change', function() {
    const selectedSeason = this.value;

    // Esconde todos os episódios inicialmente
    episodes.forEach(episode => {
        episode.style.display = 'none';
    });

    // Mostra apenas os episódios da temporada selecionada
    if (selectedSeason !== '') {
        episodes.forEach(episode => {
            if (episode.classList.contains(`season-${selectedSeason}`)) {
                episode.style.display = 'block';
            }
        });
    }
});
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
