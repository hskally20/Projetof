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

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('query');
const resultadosDiv = document.getElementById('resultados');

if (query) {
    // Simulação de resultados - substitua isso com a lógica real de busca
    resultadosDiv.innerHTML = `<p>Você pesquisou por: <strong>${query}</strong></p>`;
    // Aqui você pode adicionar lógica para exibir resultados reais.
} else {
    resultadosDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
}