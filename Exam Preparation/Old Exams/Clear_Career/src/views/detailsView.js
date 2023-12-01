import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { userService } from "../services/userService.js";
import { get } from "../services/requester.js";

function detailsTemplate(data){
    const authUser = userService.getUserData();
    const ownerID = data._ownerId;
    const userId = userService.getUserId();
    let isCreator = false;
    let isAuth = false;
    if(authUser){
        if(ownerID == userId){
            isCreator = true;
        }else{
            isAuth = true;
        }
    }
    return html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${data.imageUrl}" alt="example1" />
            <p id="details-title">${data.title}</p>
            <p id="details-category">
              Category: <span id="categories">${data.category}</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">${data.salary}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span
                  >${data.description}</span
                >
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span
                  >${data.requirements}</span
                >
              </div>
            </div>
            <p>Applications: <strong id="applications">0</strong></p>
            <div id="action-buttons">
              ${isCreator 
                ? html`<a href="/edit/${data._id}" id="edit-btn">Edit</a>
                        <a href="/delete/${data._id}" id="delete-btn">Delete</a> `
              : null}
                ${isAuth ? html`<a href="" id="apply-btn">Apply</a>` : null}
            </div>
          </div>
        </section>`;
}
export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const data = await get(`/data/offers/${id}`);
    render(detailsTemplate(data), document.querySelector('main'));
}