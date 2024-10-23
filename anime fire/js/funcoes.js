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

