import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { details } from "./detailsPage.js";

const url = '' // TO ADD URL
const host = "http://localhost:3030";

function productsTemplate(data) {
    if(data.length == 0){
        return html`<h2>No Content</h2>`;
    }else{
        return html`
            <!-- <section id="dashboard">
                ${data.map(x => productTemplate(x))}
            </section> -->
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
                x.name
                x.description
                ...
            </div>
    `
}