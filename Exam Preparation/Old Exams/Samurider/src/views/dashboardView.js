import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";

const url = '/data/motorcycles?sortBy=_createdOn%20desc';
const host = "http://localhost:3030";

function productsTemplate(data) {
    if(data.length == 0){
        return html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`;
    }else{
        return html`
            <h2>Available Motorcycles</h2>
            <section id="dashboard">
                ${data.map(x => productTemplate(x))}
            </section>
        `;
    }
    
}

export async function productsView(){
    const response = await fetch(host + url);
    const products = await response.json();
    return (render(productsTemplate(products), document.querySelector('main')));
}

function productTemplate(x){
    return html`
            <div class="motorcycle">
                <img src="${x.imageUrl}" alt="example1" />
                <h3 class="model">${x.model}</h3>
                <p class="year">Year: ${x.year}</p>
                <p class="mileage">Mileage: ${x.mileage} km.</p>
                <p class="contact">Contact Number: ${x.contact}</p>
                <a class="details-btn" href="/details/${x._id}">More Info</a>
            </div>
    `
}