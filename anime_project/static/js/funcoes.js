

function toggleGenreList() {
    const overlay = document.getElementById('genreOverlay');
    overlay.style.display = 'flex';  // Exibe o overlay
  }
  
  function closeGenreList() {
    const overlay = document.getElementById('genreOverlay');
    overlay.style.display = 'none';  // Oculta o overlay
  }
  
  
  // Lista de comentários inicial
  let comments = [
    { username: 'João', comment: 'Este anime é incrível, recomendo a todos!' },
    { username: 'Maria', comment: 'Adorei os personagens e a trama, vale a pena assistir!' },
    { username: 'Pedro', comment: 'A animação é boa, mas a história poderia ser mais envolvente.' },
    { username: 'Lucas', comment: 'Os episódios são emocionantes e cheios de ação!' },
    { username: 'Carla', comment: 'Estou ansiosa para a próxima temporada, foi uma ótima experiência!' }
  ];
  
  // Inicializa a página com os dois primeiros comentários e o botão
  let showAllComments = false;  // Controla se estamos mostrando todos os comentários ou apenas os dois primeiros
  
  // Exibe os comentários no HTML
  function writeCommentsToHTML(commentsToShow) {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = ''; // Limpa a lista antes de adicionar novos comentários
  
    commentsToShow.forEach(comment => {
      const commentHTML = `
        <li class="list-group-item">
          <b>${comment.username}</b>: ${comment.comment}
        </li>
      `;
      commentsList.insertAdjacentHTML('beforeend', commentHTML);
    });
  }
  
  // Função para adicionar um comentário
  function addComment() {
    const commentInput = document.getElementById('commentInput').value;
  
    if (commentInput) {
      // Adiciona o novo comentário à lista de comentários
      comments.push({ username: 'Usuário', comment: commentInput });
  
      // Se estamos mostrando todos os comentários, atualizar a lista
      if (showAllComments) {
        writeCommentsToHTML(comments);
      } else {
        // Se estamos mostrando apenas os dois primeiros, atualiza a lista com os dois primeiros
        writeCommentsToHTML(comments.slice(0, 2));
      }
  
      // Limpa o campo de input
      document.getElementById('commentInput').value = '';
    } else {
      alert('Por favor, digite um comentário!');
    }
  }
  
  // Função para alternar entre mostrar mais ou esconder comentários
  function toggleComments() {
    const showMoreBtn = document.getElementById('showMoreBtn');
  
    if (showAllComments) {
      // Se estamos mostrando todos os comentários, apenas mostra os dois primeiros
      writeCommentsToHTML(comments.slice(0, 2));
      showMoreBtn.innerHTML = "Mostrar mais";
    } else {
      // Se estamos mostrando apenas os dois primeiros, mostra todos os comentários
      writeCommentsToHTML(comments);
      showMoreBtn.innerHTML = "Mostrar menos";
    }
  
    // Alterna o estado de mostrar todos os comentários
    showAllComments = !showAllComments;
  }
  
  // Inicializa a página com os dois primeiros comentários
  document.addEventListener('DOMContentLoaded', function() {
    writeCommentsToHTML(comments.slice(0, 2)); // Exibe apenas os 2 primeiros comentários
  });
  