import { html, render } from "../../node_modules/lit-html/lit-html.js";

function homeTemplate(){
    return html`
    // HOME SECTION
    `;
}
export function homeView(){
    render(homeTemplate(), document.querySelector('main'));
}