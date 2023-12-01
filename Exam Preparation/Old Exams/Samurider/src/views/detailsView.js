import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { get } from "../services/requester.js";
import { userService } from "../services/userService.js";


const url = '/data/motorcycles/';

function detailsTemplate(data){
    let isOwner = false;
    let ownerId = data._ownerId;
    const userInfo = userService.getUserData();
    if(userInfo){
        const userId = userInfo._id;
        if(ownerId === userId){
            isOwner = true;
        }
    }

    return html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${data.imageUrl}" alt="example1" />
            <p id="details-title">${data.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="year">Year: ${data.year}</p>
                <p class="mileage">Mileage: ${data.mileage} km.</p>
                <p class="contact">Contact Number: ${data.contact}</p>
                   <p id = "motorcycle-description">
                    ${data.about}</p>
              </div>
               <!--Edit and Delete are only for creator-->
            ${isOwner ? html`<div id="action-buttons">
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a href="/delete/${data._id}" id="delete-btn">Delete</a>
          </div>` : html``}
            </div>
        </div>
        </section>
    `
}    



export async function detailsView(ctx){
    const id = ctx.params.id;
    const data = await get(url + id);
    return (render(detailsTemplate(data), document.querySelector('main')));
}