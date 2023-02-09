import "./Pokemon.css";

const template = () => 
    `
    <section id="poke">
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

export const printTemplate = () => {
    document.querySelector("#app").innerHTML = template();
};
let dataList = [];

const getData = async () => {
    for(let id = 1; id <= 151; id++){
        try {
            //Primero capturamos los datos en crudo
            const rawData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            //También es asíncrono
            const toJson = await rawData.json();
            dataList.push(toJson);
        } catch (error) {
            console.log('Ha habido un error capturándolos a todos')
        }
    };
};

getData();

console.log(dataList);

