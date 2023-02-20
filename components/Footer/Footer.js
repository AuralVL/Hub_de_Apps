import "./Footer.css";

const template = () => `
    <p>Powered by Aura</p>
`;

export const printTemplate = () => {
    document.querySelector("footer").innerHTML = template();
};