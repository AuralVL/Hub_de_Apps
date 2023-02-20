import "./Pokemon.css";

const template = () => 
    `
    <section>
        <h1>Pokédex</h1>
        <div class="search">
            <input type="text" id="searchInput" placeholder="Buscar Pokémon">
        </div>
        <div id="pokeContainer">
        </div>
    </section>
    `
;

let dataList = [];

const typeColor = {
    grass: "#6daa4b",
    fire: "#d74e4a",
    water: "#0383fd",
    bug: "#b2e85d",
    normal: "#77767c",
    poison: "#a15fc9",
    electric: "#ffe234",
    ground: "#7b4624",
    fairy: "#f49bbf",
    fighting: "#ffbb52",
    psychic: "#ff6d86",
    rock: "#8f8377",
    ghost: "#630975",
    ice: "#78ffff",
    dragon: "#12417a",
};

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
    mapData(dataList); //pokemons
};

//Mapear 
let mappedPokemons = [];

const mapData = (pokemons) => {
    mappedPokemons = pokemons.map((pokemon) => ({
        name: pokemon.name,
        image: pokemon.sprites.other["official-artwork"].front_default,
        type: pokemon.types[0].type.name,
        height: pokemon.height,
        weight: pokemon.weight,
        abilities: pokemon.abilities,
    }));
    printPokemon(mappedPokemons);
    changeColorCard(); //Cambiamos el color cuando las cards ya estén pintadas
};

//Pintar
const printPokemon = (mappedPokemons) => {
    const container = document.querySelector("#pokeContainer");
    mappedPokemons.map((pokemon) => {
        container.innerHTML += `
            <div id="card" class="${pokemon.type}">
                <img src=${pokemon.image} alt=${pokemon.name}/>
                <h2>${pokemon.name}</h2>
                <div id="type">
                    <p>${pokemon.type}</p>
                </div>
                <div class="hw">
                    <span>
                        ${pokemon.height / 10} m
                        <p>Height</p>
                    </span>
                    <span>
                    ${pokemon.weight / 10} kg
                    <p>Weight</p>
                    </span>
                </div>
            </div>
        `;
    });
}
/*/<p>Habilidades:</p>
<div class="abilities">
${pokemon.abilities.map((ability) => (`<p>${ability.ability.name}</p>`)).join(' ')}
</div> */
//${pokemon.moves.splice(0, 3).map((move) => (`<p>${move.move.name}</p>`))}
const changeColorCard = () => {
    for (const color in typeColor) {
        //Construimos cómo se llama la clase
        let themeColor = `.${color}`;
        let card = document.querySelectorAll(themeColor);
        card.forEach(element => {
            element.style.background = `linear-gradient(160deg, ${typeColor[color]} 40%, whitesmoke 40%)`;
            element.querySelector("#type").style.background = `${typeColor[color]}`;
        });
    }
};

const filter = (pokemonName) => {
    const filteredPokemons = mappedPokemons.filter((pokemon) => pokemon.name.includes(pokemonName.toLowerCase()));
    printPokemon(filteredPokemons);
    changeColorCard();
};

const addListeners = () => {
    const searchInput = document.querySelector("#searchInput");
    searchInput.addEventListener("input", (ev) => {
        document.querySelector("#pokeContainer").innerHTML = "";
        filter(searchInput.value);
    });
};

export const printTemplate = () => {
    document.querySelector("#app").innerHTML = template();
    getData();
    addListeners();
};




