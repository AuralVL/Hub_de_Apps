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
    changeColorCard(); //Cambiamos el color cuando las cards ya estén pintadas
}

//Pintar
const printPokemon = (mappedPokemons) => {
    const container = document.querySelector("#pokeContainer");
    mappedPokemons.map((pokemon) => {
        container.innerHTML += `
            <div id="card" class="${pokemon.type[0].type.name}">
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

const changeColorCard = () => {
    for (const color in typeColor) {
        //Construimos cómo se llama la clase
        let themeColor = `.${color}`;
        let card = document.querySelectorAll(themeColor);
        card.forEach(element => {
            element.style.background = `linear-gradient(160deg, ${typeColor[color]} 40%, whitesmoke 40%)`;
        });
    }
}

export const printTemplate = () => {
    document.querySelector("#app").innerHTML = template();
    getData();
};




