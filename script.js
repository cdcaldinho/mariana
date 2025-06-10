const form = document.getElementById('pokemon-form');
const input = document.getElementById('pokemon-input');
const result = document.getElementById('pokemon-result');

const increaseFont = document.getElementById('increase-font');
const decreaseFont = document.getElementById('decrease-font');
const toggleContrast = document.getElementById('toggle-contrast');

let currentFontSize = 16;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pokemon = input.value.toLowerCase().trim();

    if (!pokemon) {
        result.innerHTML = `<p>Por favor, digite um nome ou ID de Pokémon.</p>`;
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (!response.ok) throw new Error('Pokémon não encontrado');

        const data = await response.json();

        // Dados básicos do Pokémon
        result.innerHTML = `
            <h3>${capitalize(data.name)}</h3>
            <img src="${data.sprites.front_default}" alt="Imagem do Pokémon ${capitalize(data.name)}" />
            <p><strong>ID:</strong> ${data.id}</p>
            <p><strong>Altura:</strong> ${data.height}</p>
            <p><strong>Peso:</strong> ${data.weight}</p>
            <p><strong>Tipos:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
        `;
    } catch (error) {
        result.innerHTML = `<p>Pokémon não encontrado. Verifique o nome ou ID digitado.</p>`;
    }
});

// Função auxiliar para capitalizar o nome
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Controle de fonte e contraste
increaseFont.addEventListener('click', () => {
    currentFontSize += 2;
    document.documentElement.style.setProperty('--font-size', `${currentFontSize}px`);
});

decreaseFont.addEventListener('click', () => {
    if (currentFontSize > 10) {
        currentFontSize -= 2;
        document.documentElement.style.setProperty('--font-size', `${currentFontSize}px`);
    }
});

toggleContrast.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});
// Função para ler o texto do main#main-content em voz alta
function lerConteudo() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // Cancela qualquer fala atual
    window.speechSynthesis.cancel();

    // Extrai texto visível do main (filtrando tags script/style, etc)
    const texto = mainContent.innerText.trim();
    if (!texto) return;

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';

    // Você pode configurar voz, volume, rate, pitch aqui, se quiser
    // utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'pt-BR');

    window.speechSynthesis.speak(utterance);
}

// Botão "Ler Conteúdo"
const btnRead = document.getElementById('read-content');
if (btnRead) {
    btnRead.addEventListener('click', () => {
        lerConteudo();
    });
}
