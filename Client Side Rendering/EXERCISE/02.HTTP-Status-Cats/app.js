import { html, render } from "./node_modules/lit-html/lit-html.js";

import { cats } from "./catSeeder.js";
const catsSection = document.getElementById('allCats');
function catsLoader() {
    let templates = html`
        <ul>${cats.map(x => createLi(x))}</ul>
        `;
    renderer(templates, catsSection);
    ;
}
catsLoader();
function createLi(cat){
    return html`
    <li>
        <img src="./images/cat${cat.id}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${showHide}>Show status code</button>
                <div class="status" style="display: none" id="${cat.id}">
                    <h4>${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                </div>
        </div>
    </li>`;
}
function renderer(code, ref) {
    render(code, ref)
}
function showHide(e) {
    const button = e.target;
    const div = button.parentElement.querySelector('div');
    let currentState = div.style.display
    div.style.display = currentState === 'none' ? 'block' : 'none';
    button.textContent = currentState === 'none' ? 'Hide status code' : 'Show status code';
}
