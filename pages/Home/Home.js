import { initContent } from "../../main";
import "./Home.css";

const template = () => `
<section id="home">
    <div class="flex__container">
        <div class="flex__item--left">
            <div class="flex__content">
                <h1 class="text--big">¡Bienvenide, ${localStorage.getItem("user")}!</h1>
                <p class="text--normal">¿Quieres ser el mejor entrenador? ¡Accede a la Pokédex y captúralos a todos!</p>
                <button id="pokedex__btn">
                    Acceder a Pokédex
                </button>
            </div>
        </div>
        <img class="pokemon__img" src="https://res.cloudinary.com/dbumm5v2e/image/upload/v1677080084/Psyduck_f1vydj.png" />
    </div>
</section>
`;

const addListeners = () => {
   document
   .querySelector("#pokedex__btn")
   .addEventListener("click", () => initContent("Pokemon"));
}

export const printTemplate = () => {
    document.querySelector("#app").innerHTML = template();
    addListeners();
}