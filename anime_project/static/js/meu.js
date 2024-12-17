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
                        <a href="/anime/${anime.mal_id}/" class="button">Assistir Agora</a>
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

fetch('/anime_app/add_comment/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
.then(response => response.json())
.then(responseData => {
    if (responseData.success) {
        loadComments(episodeId);
    } else {
        alert(responseData.error);
    }
})
.catch(error => console.error('Erro ao adicionar comentário:', error));
function getCSRFToken() {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    return csrfToken;
}


function addComment(episodeId) {
    const commentInput = document.getElementById('commentInput').value;
    const userName = 'Usuário'; // Exemplo de nome de usuário

    if (commentInput) {
        const data = {
            user_name: userName,
            content: commentInput,
            episode_id: episodeId
        };

        fetch('/anime_app/add_comment/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()  // Adiciona o token CSRF
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(responseData => {
            if (responseData.success) {
                loadComments(episodeId);  // Atualiza os comentários após adicionar
            } else {
                alert(responseData.error);
            }
        })
        .catch(error => console.error('Erro ao adicionar comentário:', error));
    } else {
        alert('Por favor, digite um comentário!');
    }
}

function getCSRFToken() {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    return csrfToken;
}