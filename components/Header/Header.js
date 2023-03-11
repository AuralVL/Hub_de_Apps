import "./Header.css";
import { initContent } from "../../main";

const template = () => `
<div>
    <div class="container-nav">
        <button id="logout">
            <img src="https://res.cloudinary.com/dbumm5v2e/image/upload/v1678457410/9070509_wcjces.png" alt="logout icon">
        </button>
        <button id="home-btn">
            <img src="https://res.cloudinary.com/dbumm5v2e/image/upload/v1678563030/8914909_fk2hm0.png" alt="home icon">
        </button>
    </div>
    <div class="container-theme">
        <button id="colorBtn">
            <img src="https://res.cloudinary.com/dbumm5v2e/image/upload/v1678452829/7650388_obfqoe.png" alt="change theme icon">
        </button>
    </div>
</div>
`
const addListener = () => {
    document
    .querySelector("#colorBtn")
    .addEventListener("click", () => changeColor());

    document.
    querySelector("#logout")
    .addEventListener("click", () => {
        localStorage.removeItem("user");
        initContent();
    })

    document
    .querySelector("#home-btn")
    .addEventListener("click", () => {
        initContent();
    })
};

//changeColor en utils ??????
const changeColor = () => {
    let symbols = "0123456789ABCDEF";
    let newColor = "#";

    for (let i = 0; i < 6; i++){
        newColor = newColor + symbols[Math.floor(Math.random() * 16)];
    };
    
    document.body.style.background = newColor;
}

export const printTemplate = () => {
    document.querySelector("header").innerHTML = template();
    addListener();
};