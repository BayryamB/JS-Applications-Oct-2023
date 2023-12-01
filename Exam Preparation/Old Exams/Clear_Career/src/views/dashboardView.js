import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";

const url = '/data/offers?sortBy=_createdOn%20desc'
const host = "http://localhost:3030";

function productsTemplate(data) {
    if(data.length == 0){
        return html`<h2>No offers yet.</h2>`;
    }else{
        return html`
        <section id="dashboard">
          <h2>Job Offers</h2>
          ${data.map(x => productTemplate(x))}
        </section>
        `;
    }
    
}

export async function dashboard(){
    const response = await fetch(host + url);
    const products = await response.json();
    return (render(productsTemplate(products), document.querySelector('main')));
}

function productTemplate(x){
    return html`
            <div class="offer">
            <img src="${x.imageUrl}" alt="example2" />
            <p>
              <strong>Title: </strong
              ><span class="title">${x.title}</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">${x.salary}</span></p>
            <a class="details-btn" href="/details/${x._id}">Details</a>
          </div>
    `
}