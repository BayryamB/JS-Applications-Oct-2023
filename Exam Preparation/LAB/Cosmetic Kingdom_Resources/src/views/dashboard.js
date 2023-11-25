import page from "../../node_modules/page/page.mjs";
import { html, render} from "../../node_modules/lit-html/lit-html.js";
import { get } from "../services/requester.js";
import { details } from "./details.js";
async function dashboardView(){
    const products = await getProducts();
    if(products.length == 0){
        return html`
            <h2>No products yet.</h2>
        `
    }
    return html`
            <h2>Products</h2>
        <section id="dashboard">
        ${products.map(x => makeTemp(x))}
        </section>
    `
}
export async function dashboard() {
    render(await dashboardView(), document.querySelector('main'));
}

async function getProducts(){
    const response = await fetch('http://localhost:3030/data/products?sortBy=_createdOn%20desc');
    const data = await response.json();
    return data;
}

function makeTemp(x){
    return html`
        <div class="product">
            <img src="${x.imageUrl}" alt="example1" />
            <p class="title">
            ${x.name}
            </p>
            <p><strong>Price:</strong><span class="price">${x.price}</span>$</p>
            <a class="details-btn" href="/details" @click=${(e) => {e.preventDefault(); details(x)}}>Details </a>
        </div>
    `
    
}