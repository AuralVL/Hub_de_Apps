import "./Pokemon.css";

const template = () => 
    `
    <section>
        <h1>PokeApi</h1>
        <div>
            <input type="text" id="searchInput" placeholder="Buscar Pokémon">
            <button id="searchBtn">Buscar</button>
        </div>
        <div id="pokeContainer">
        </div>
    </section>
    `
;

let dataList = [];

const getData = async () => {
    for(let id = 1; id <= 151; id++){
        try {
            //Primero capturamos los datos en crudo
            const rawData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            //También es asíncrono
            const dataToJson = await rawData.json();
            dataList.push(dataToJson);
        } catch (error) {
            console.log('Ha habido un error capturándolos a todos')
        };
    };
    mapData(dataList);
};

//Mapear 
const mapData = (pokemons) => {
    const mappedPokemons = pokemons.map((pokemon) => ({
        name: pokemon.name,
        image: pokemon.sprites.other["official-artwork"].front_default,
        type: pokemon.types,
        height: pokemon.height,
        moves: pokemon.moves
    }));
    printPokemon(mappedPokemons);
}

//Pintar
const printPokemon = (mappedPokemons) => {
    const container = document.querySelector("#pokeContainer");
    mappedPokemons.map((pokemon) => {
        container.innerHTML += `
            <div id="card">
                <img src=${pokemon.image} alt=${pokemon.name}/>
                <h2>${pokemon.name}</h2>
                <div id="type">
                    <img src="https://cdn-icons-png.flaticon.com/512/31/31714.png" alt="icon">
                    <p>${pokemon.type[0].type.name}</p>
                </div>
                <div class="moves">
                    ${pokemon.moves.splice(0, 3).map((move) => (`<p>${move.move.name}</p>`))}
                </div>
            </div>
        `;
    });
}

export const printTemplate = () => {
    document.querySelector("#app").innerHTML = template();
    getData();
};




