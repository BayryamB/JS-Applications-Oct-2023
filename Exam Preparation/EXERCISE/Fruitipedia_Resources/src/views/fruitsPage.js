import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { details } from "./detailsPage.js";

const url = '/data/fruits?sortBy=_createdOn%20desc'
const host = "http://localhost:3030";

function productsTemplate(data) {
    if(data.length == 0){
        return html`<h2>No fruit info yet.</h2>`;
    }else{
        const fruits = data;
        return html`
            <h2>Fruits</h2>
            <section id="dashboard">
                ${fruits.map(x => productTemplate(x))}
            </section>
        `;
    }
    
}

export async function fruitsView(){
    const response = await fetch(host + url);
    const products = await response.json();
    return (render(productsTemplate(products), document.querySelector('main')));
}

function productTemplate(x){
    return html`
            <div class="fruit">
                <img src="${x.imageUrl}" alt="example1" />
                <h3 class="title">${x.name}</h3>
                <p class="description">${x.description}</p>
                <a class="details-btn" href="/details/${x._id}" @click=${(e) => { e.preventDefault(); details(x._id)}}>More Info</a>
            </div>
    `
}