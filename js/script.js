const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
const perPage = 10;
let currentPage = 1;

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');
const appContainer = document.getElementById('app');

if (searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
}

if (resetBtn) {
    resetBtn.addEventListener('click', () => goToPage(1));
}

async function fetchData(url) {
    try {
        const response = await fetch(url);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }

        const data = await response.json();

        if (Array.isArray(data.results)) {
            displayData(data.results);
        } else if (data.name) {
            // If it's a single Pokemon, wrap it in an array for consistent handling
            displayData([data]);
        } else {
            console.error('Unexpected data format:', data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);

        // Display an error message in the appContainer
        appContainer.innerHTML = `<p class="error-message">The Pokémon you are looking for does not exist in the Pokédex.</p>`;
    }
}

function displayData(pokemonList) {
    appContainer.innerHTML = '';

    if (pokemonList.length === 0) {
        appContainer.innerHTML = '<p>No matching Pokémon found.</p>';
    } else {
        pokemonList.forEach(pokemon => {
            const card = createPokemonCard(pokemon);
            appContainer.innerHTML += createPokemonCard(pokemon)
        });
    }
}

function createPokemonCard(pokemon) {
    const card = `<div class="pokemon-card">
      <img src=https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png alt=${pokemon.name}/>
      <p>${capitalizeFirstLetter(pokemon.name)}</p>
    </div>`

    return card;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function goToPage(page) {
    if (page >= 1) {
        currentPage = page;
        const url = `${apiUrl}?limit=${perPage}&offset=${(currentPage - 1) * perPage}`;
        fetchData(url);
    }
}

async function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm.length >= 3) {
        const searchUrl = `${apiUrl}/${searchTerm}`;
        await fetchData(searchUrl);
    } else {
        const url = `${apiUrl}?limit=${perPage}&offset=${(currentPage - 1) * perPage}`;
        await fetchData(url);
    }
}

// Initial load
const initialUrl = `${apiUrl}?limit=${perPage}&offset=${(currentPage - 1) * perPage}`;
fetchData(initialUrl);