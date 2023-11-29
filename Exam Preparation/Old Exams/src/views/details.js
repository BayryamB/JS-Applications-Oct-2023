import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { get } from "../services/requester.js";
import { userService } from "../services/userService.js";
function detailsTemplate(data){
    const ownerId = data._ownerId;
    const userId = userService.getUserId();
    return html`
    <section id="details">
        <div id="details-wrapper">
        <img id="details-img" src="${data.imageUrl}" alt="example1" />
        <p id="details-title">${data.name}</p>
        <p id="details-category">
            Category: <span id="categories">${data.category}</span>
        </p>
        <p id="details-date">
            Date:<span id="date">${data.date}</span></p>
        <div id="info-wrapper">
            <div id="details-description">
            <span
                >${data.description}</span>
            </div>

        </div>

        <h3>Going: <span id="go">0</span> times.</h3>
            ${checker(ownerId, userId)}
        </div>
    </section>
    `
}
function checker(ownerId, userId){
    if(ownerId == userId){
        return html`
        <div id="action-buttons">
            <a href="" id="edit-btn">Edit</a>
            <a href="" id="delete-btn">Delete</a>
        </div>`
    }else if(userService.getUserData()){
        return html`
            <div id="action-buttons">
                <a href="" id="go-btn">Going</a>
            </div>
        `
    }
}
export async function details(ctx){
    const id = ctx.params.id;
    const info = await get('/data/events/' + id);
    render(detailsTemplate(info), document.querySelector('main'));
}