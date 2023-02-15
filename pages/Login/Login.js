import { initContent } from "../../main";
import "./Login.css";

const template = () => `
<section class="login">
    <div class="form">
        <h1 id="loginTitle">Login</h1>
        <form>
            <label for="username">Usuario</label>
            <input type="text" id="loginInput" maxlength="20" required>
        </form>
        <button id="loginBtn">Acceder</button>
    </div>
</section>
`;

const addListener = () => {
    const loginInput = document.querySelector("#loginInput");
    document
    .querySelector("#loginBtn")
    .addEventListener("click", () => {
        loginInput.value.length == 0 ? alert("Por favor, añada un nombre de usuario") : localStorage.setItem("user", loginInput.value);
        initContent();
    });
}

export const printTemplate = () => {
    document.querySelector("#app").innerHTML = template();
    addListener();
}

