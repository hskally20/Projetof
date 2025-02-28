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


document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o usuário está logado e altera o ícone
    const userMenuButton = document.getElementById('userMenuButton');
    
    // Verifica a autenticação diretamente no carregamento
    if (userMenuButton && !userMenuButton.innerHTML.trim()) {
      userMenuButton.innerHTML = `<i class="bi bi-person-circle"></i>`;  // Ícone de pessoa se não logado
    }
  });
  