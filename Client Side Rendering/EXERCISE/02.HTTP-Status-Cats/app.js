import { html, render } from "./node_modules/lit-html/lit-html.js";

import { cats } from "./catSeeder.js";
const catsSection = document.getElementById('allCats');
function catsLoader() {
    let templates = html`
        <ul>${cats.map(x => createLi(x))}</ul>
        `;
    renderer(templates, catsSection);
    let buttons = document.querySelectorAll('button');
    let btnArray = Array.from(buttons);
    btnArray.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        showHide(e.target);
    }));
}
function createLi(cat){
    return html`
    <li>
        <img src="./images/cat${cat.id}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" id="${cat.id}">Show status code</button>
                <div class="status" style="display: none" id="${cat.id}">
                    <h4>${cat.statusCode}</h4>
                    <p>Continue</p>
                </div>
        </div>
    </li>`;
}
function renderer(code, ref) {
    render(code, ref)
}
function showHide(e) {
    //to add logic for showing the status code!
    

}
catsLoader();