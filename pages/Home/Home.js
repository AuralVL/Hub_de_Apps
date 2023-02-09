import { initContent } from "../../main";
import "./Home.css";

const template = () => `
<section id="home">
        <h1 class="hello">¡Hola, ${localStorage.getItem("user")}!</h1>
        <div class="hub">
            <button id="pokecard">
                <img src="https://www.freepnglogos.com/uploads/black-pokemon-logo-transparent-27.png"/>
                <a href="#" id="pokelink></a>
            </button>
            <button>aaa</button>
        </div>
</section>
`;

const addListeners = () => {
   document
   .querySelector("#pokecard")
   .addEventListener("click", () => initContent("Pokemon"));
}

export const printTemplate = () => {
    document.querySelector("#app").innerHTML = template();
    addListeners();
}