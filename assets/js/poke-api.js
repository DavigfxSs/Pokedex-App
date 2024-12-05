const pokeApi = {};

function convertPokeApiDetail(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;  // Use o ID para garantir que o número é correto
    pokemon.name = pokeDetail.name;
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    
    pokemon.type = pokemon.types[0]; // Usa o primeiro tipo como o tipo principal
    return pokemon;
}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetail);
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => {
            return Promise.all(pokemons.map((pokemon) => pokeApi.getPokemonsDetail(pokemon)));
        })
        .then((pokemonsDetails) => {
            
            return pokemonsDetails.sort((a, b) => a.number - b.number);
        });
}
