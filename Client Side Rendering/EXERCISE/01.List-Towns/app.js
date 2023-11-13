import { html, render } from "./node_modules/lit-html/lit-html.js";

const root = document.getElementById('root');
const input = document.querySelector('#towns');
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit)

function onSubmit(e) {
    e.preventDefault();
    let towns = input.value.split(', ');
    let temp =  html`
    <ul>${towns.map(x => createTemp(x))}</ul>
    `;
    renderer(temp, root)
}
function createTemp(data) {
    return html `
    <li>${data}</li>`
}

function renderer(x, root) {
    render(x, root);
}