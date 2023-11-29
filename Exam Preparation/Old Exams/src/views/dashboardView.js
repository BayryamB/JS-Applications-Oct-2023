import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";

const url = '/data/events?sortBy=_createdOn%20desc'
const host = "http://localhost:3030";

function dashboardTemplate(data) {
    if(data.length == 0){
        return html`<h4>No Events yet.</h4>`;
    }else{
        return html`
            <h2>Current Events</h2>
            <section id="dashboard">
                ${data.map(x => productTemplate(x))}
            </section>
        `;
    }
    
}

export async function getEvents(){
    const response = await fetch(host + url);
    const products = await response.json();
    return (render(dashboardTemplate(products), document.querySelector('main')));
}

function productTemplate(x){
    return html`
            <div class="event">
                <img src="${x.imageUrl}" alt="example1" />
                <p class="title">
                ${x.name}
                </p>
                <p class="date">${x.date}</p>
                <a class="details-btn" href="">Details</a>
            </div>
    `
}