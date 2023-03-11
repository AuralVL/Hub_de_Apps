import "./Pokemon.css";

const template = () => 
    `
    <section id="pagePokemon">
        <div class="flex-container">
            <div class="content-bg">
                <img src="https://res.cloudinary.com/dbumm5v2e/image/upload/v1678527408/img_174253_jdsbds.png" alt="pokeball image">
            </div>
            <div class="container-input">
                <input type="text" placeholder="Buscar Pokémon" name="text" class="input">
                <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                    <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fill-rule="evenodd"></path>
                </svg>
            </div>
            <div id="filterButton"></div>
        </div>
            <div id="pokeContainer">
            </div>
    </section>
    `
;

let dataList = [];

const typeColor = {
    grass: "#16C172",
    fire: "#EF271B",
    water: "#4361EE",
    bug: "#059669",
    normal: "#C18CBA",
    poison: "#6E44FF",
    electric: "#FFBF00",
    ground: "#885629",
    fairy: "#EE4268",
    fighting: "#C75000",
    psychic: "#DB00B6",
    rock: "#63320B",
    ghost: "#9A54A1",
    ice: "#90E0EF",
    dragon: "#2EC4B6",
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
    container.innerHTML = " ";
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



const filterButtonType = () => {
    const containerFilter = document.querySelector("#filterButton");
    for (const type in typeColor) {
        const templateType = `
            <button class="filter-button" id=${type} style="background: ${typeColor[type]};">
                ${type}
            </button>
        `;
        containerFilter.innerHTML += templateType;
    };
};

const filterType = (pokemonType) => {
    const filteredPokemons = mappedPokemons.filter((pokemon) => pokemon.type.includes(pokemonType.toLowerCase()));
    printPokemon(filteredPokemons);
    changeColorCard();
};

const addListeners = () => {
    const searchInput = document.querySelector(".input");
    searchInput.addEventListener("input", (ev) => {
        document.querySelector("#pokeContainer").innerHTML = "";
        filter(searchInput.value);
    });
    const filterButton = document.querySelectorAll(".filter-button");
    filterButton.forEach(buttonfilter => buttonfilter.addEventListener("click", (e) => {
        const id = e.target.getAttribute("id");
        filterType(id);
    }));
};

export const printTemplate = () => {
    document.querySelector("#app").innerHTML = template();
    filterButtonType();
    getData();
    addListeners();
};




