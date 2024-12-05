document.addEventListener('DOMContentLoaded', () => {
    const pokemonList = document.getElementById('pokemonList');
    const loadMoreButton = document.getElementById('loadmore');
    const limit = 10;
    let offset = 0;
    let isLoading = false;

    // Função para converter o tipo de pokémon para um item <li>
    function convertPokemonTypeToLi(pokemonTypes) {
        return pokemonTypes.map((type) => `<li class="type">${type}</li>`).join('');
    }

    // Função para converter o pokémon para um item <li>
    function convertPokemonToLi(pokemon) {
        return `<li class="pokemon ${pokemon.type}">
                    <span class="number">#${String(pokemon.number).padStart(3, '0')}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="details">
                        <ol class="types">
                            ${convertPokemonTypeToLi(pokemon.types)}
                        </ol>
                        <div class="pokeimage">
                            <img src="assets/img/pokemons/poke_${pokemon.number}.gif" alt="${pokemon.name}">
                        </div>
                    </div>
                </li>`;
    }

    
    function loadPokemons() {
        if (isLoading) return;
        isLoading = true; 

        
        pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            if (pokemons.length > 0) {
                
                pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');
                offset += limit;  

                
                const lastPokemonNumber = pokemons[pokemons.length - 1].number;

                
                if (lastPokemonNumber >= 300) {
                    loadMoreButton.disabled = true;
                    loadMoreButton.innerText = "Sem mais pokémons por enquanto ;)";
                }
            } else {
                
                loadMoreButton.disabled = true;
                loadMoreButton.innerText = "Sem mais pokémons";
            }

            isLoading = false; 
        }).catch((error) => {
            console.error("Erro ao carregar pokémons:", error);
            isLoading = false;
        });
    }

    
    loadPokemons();

    
    loadMoreButton.addEventListener('click', () => {
        loadPokemons();   
    });
});
