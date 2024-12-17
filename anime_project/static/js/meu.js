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

// Função para carregar os comentários
function loadComments(episodeId) {
    fetch(`/anime_app/load_comments/?episode_id=${episodeId}`)
        .then(response => response.json())
        .then(comments => {
            const commentsContainer = document.getElementById('commentsContainer');
            commentsContainer.innerHTML = ''; // Limpa os comentários antigos

            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                commentElement.innerHTML = `
                    <p><strong>${comment.user_name}</strong>: ${comment.content}</p>
                    <p><small>${comment.created_at}</small></p>
                `;
                commentsContainer.appendChild(commentElement);
            });
        })
        .catch(error => console.error('Erro ao carregar comentários:', error));
 
}
document.addEventListener('DOMContentLoaded', function() {
    const episodeId = {{ episode_id }};  // Garanta que o ID do episódio seja passado do Django para o template
    loadComments(episodeId);
});
// Função para adicionar um comentário
function addComment() {
    const commentInput = document.getElementById('commentInput');
    const commentContent = commentInput.value;

    if(commentContent) {
        // Lógica para enviar o comentário via AJAX
        fetch('/add_comment/', {  // Altere a URL conforme necessário
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            body: JSON.stringify({ content: commentContent, episode_id: episodeId })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                // Adiciona o comentário à lista
                const commentList = document.getElementById('commentsList');
                const newComment = document.createElement('li');
                newComment.classList.add('list-group-item');
                newComment.innerHTML = `<p>${data.comment.content}</p><small>${data.comment.created_at}</small>`;
                commentList.prepend(newComment);
                commentInput.value = '';  // Limpa o campo de comentário
            }
        });
    }
}
function getCSRFToken() {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    return csrfToken;
}
