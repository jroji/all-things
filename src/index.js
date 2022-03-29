function sayHi(id, name) {
    document.getElementById(id).classList.toggle('active');

    // Obtenemos el valor, que puede ser un texto o null
    const listInText = window.localStorage.getItem('pokemons');
    // Inicializamos el array
    let listOfPokemons = [];
    // Comprobamos si el valor existe o es null. Si no es null, lo leemmos y parseamos
    if (listInText !== null) {
        listOfPokemons = JSON.parse(listInText);
    }
    // Introducimos el nuevo valor en la lista
    listOfPokemons.push(name);
    // Escribimos en memoria transformando en texto
    window.localStorage.setItem('pokemons', JSON.stringify(listOfPokemons)); 
}

let favouritePokemons = [];
const favouritePokemonsInText = localStorage.getItem('pokemons');
if (favouritePokemonsInText != null) {
    favouritePokemons = JSON.parse(favouritePokemonsInText);
}

axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
    .then(function(response) { 
        paintList(response.data.results);

        document.querySelector('.search').addEventListener('input', function(event) {
            const value = document.querySelector('.search').value;
     
            document.querySelector('.list').innerHTML = '';
            response.data.results.forEach(function (pokemon, index) {
                if (pokemon.name.includes(value)) {
                    if (favouritePokemons.includes(pokemon.name)) {
                        document.querySelector('.list').innerHTML += `
                        <div id="${index}" class="pokemon active" onclick="sayHi(${index}, '${pokemon.name}')">
                        <a href="/detail.html?pokemon=${pokemon.name}">${pokemon.name}</a>
                        </div>`;
                    } else {
                        document.querySelector('.list').innerHTML += `
                        <div id="${index}" class="pokemon" onclick="sayHi(${index}, '${pokemon.name}')">
                        <a href="/detail.html?pokemon=${pokemon.name}">${pokemon.name}</a>
                        </div>`;
                    }
                }
            });
        })
    })

function paintList(results) {
    document.querySelector('.list').innerHTML = '';
    results.forEach(function (pokemon, index) {
        if (favouritePokemons.includes(pokemon.name)) {
            document.querySelector('.list').innerHTML += `
            <div id="${index}" class="pokemon active" onclick="sayHi(${index}, '${pokemon.name}')">
            <a href="/detail.html?pokemon=${pokemon.name}">${pokemon.name}</a>
            </div>`;
        }
    });
}

