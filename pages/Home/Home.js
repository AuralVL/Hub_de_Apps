import { initContent } from "../../main";
import "./Home.css";

const template = () => `
<section id="home">
        <h1 class="hello">¡Hola, ${localStorage.getItem("user")}!</h1>
        <div class="hub">
            <ul>
                <li><a href="#" id="pokelink">Pokédex</a></li>
                <li>PokeQuiz</li>
            </ul>
        </div>
        <img src="https://res.cloudinary.com/dbumm5v2e/image/upload/v1676909414/charmander_qkuzlo.png">
</section>
`;

const addListeners = () => {
   document
   .querySelector("#pokelink")
   .addEventListener("click", () => initContent("Pokemon"));
}

export const printTemplate = () => {
    document.querySelector("#app").innerHTML = template();
    addListeners();
}