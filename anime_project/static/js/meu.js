async function carregarNovidades() {
    const container = document.getElementById('novidades-container');
    try {
        // Requisição à API
        const response = await fetch('https://api.jikan.moe/v4/seasons/now');
        if (!response.ok) {
            throw new Error('Erro ao obter dados');
        }

        const data = await response.json();
        const animes = data.data; // Lista de animes em exibição

        container.innerHTML = ''; // Limpar conteúdo anterior

        // Verificando se há animes na resposta
        if (animes.length > 0) {
            animes.forEach(anime => {
                const animeElement = document.createElement('div');
                animeElement.classList.add('novidade');
                
                animeElement.innerHTML = `
                    <img src="${anime.images.jpg.image_url}" alt="${anime.title}" class="novidade-img">
                    <div class="novidade-info">
                        <h2>${anime.title}</h2>
                        <a href="lista-ep.html?id=${anime.mal_id}" class="button">Assistir Agora</a>
                    </div>
                `;
                
                container.appendChild(animeElement);
            });
        } else {
            container.innerHTML = '<p>Não há novidades no momento.</p>';
        }

    } catch (error) {
        console.error('Erro ao carregar novidades:', error);
        container.innerHTML = '<p>Erro ao carregar novidades. Tente novamente mais tarde.</p>';
    }
}

window.onload = carregarNovidades;



  // Função para carregar os detalhes do anime e episódios
  async function loadAnimeDetails() {
    // Pega o animeId da URL
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
          <img src="${animeData.data.images.jpg.large_image_url}" class="card-img-top img-fluid" alt="${animeData.data.title}" style='max-whidth: 100%;'>
          <div class="card-body">
            <h5 class="card-title">${animeData.data.title}</h5>
            <p class="card-text">${animeData.data.synopsis}</p>
          </div>
        </div>
        <h3 class="mt-4">Episódios</h3>
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
    } catch (error) {
      console.error('Erro ao carregar os detalhes do anime:', error);
      alert('Não foi possível carregar os detalhes do anime.');
    }
  }
  
  // Carregar os detalhes do anime quando a página for carregada
  document.addEventListener('DOMContentLoaded', loadAnimeDetails);