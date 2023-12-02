const showPokemons = document.getElementById('app');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

// aqui me traigo el catalogo de pokemons



const getPokemons = async () => {
    try {
    
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/`);

        if (!res.ok) {
            throw new Error ("La lista de Pokemon no se pudo cargar");
        }
        const pokemons = await res.json();
        console.log(pokemons);
    
        // const pokemonName = pokemons.results.name;
        
        
        printPokemons(pokemons);
        
    } catch (error) {
        console.log(error);
    }
    

};

getPokemons();


const printPokemons = (pokemons) => {
    const pintarPokemons = pokemons.results;
    pintarPokemons.forEach(elementPok => {
        const pokemonName = elementPok.name;
        // const pokeImagen = elementPok.sprites.back_default;
         
        showPokemons.innerHTML += `<li>
        <p>Nombre: ${pokemonName}</P>
        </li>`
    });
};



searchBtn.addEventListener('click', () => {
    const findPokemon = searchInput.value;
    (`https://pokeapi.co/api/v2/pokemon/${findPokemon}`)

});