import "./Header.css";
import "../../pages/Home/Home.css";

const template = () => `
<div>
    <button id="colorBtn">Color Randomizer</button>
</div>
`
const addListener = () => {
    document
    .querySelector("#colorBtn")
    .addEventListener("click", () => changeColor());
};

//changeColor en utils ??????
const changeColor = () => {
    let symbols = "0123456789ABCDEF";
    let newColor = "#";

    for (let i = 0; i < 6; i++){
        newColor = newColor + symbols[Math.floor(Math.random() * 16)];
    };
    
    document.body.style.background = newColor;
    document.querySelector("#colorBtn").style.color = newColor;
    document.querySelector(".hello").style.color= newColor;
}

export const printTemplate = () => {
    document.querySelector("header").innerHTML = template();
    addListener();
};