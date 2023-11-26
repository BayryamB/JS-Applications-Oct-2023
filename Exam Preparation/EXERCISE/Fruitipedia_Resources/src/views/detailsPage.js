import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { get, del } from "../services/requester.js";
import { userService } from "../services/userService.js";

const url = '/data/fruits/';


function detailsView(fruit){
    let isOwner = false;
    function div(){
        const creatorId = userService.getUserId();
        const postId = fruit._ownerId;
        if(creatorId == postId){
            isOwner = true;
        }
    }
    div();
    async function deleteFruit(e){
        e.preventDefault();
        const path = '/data/fruits/' + fruit._id;
        const response = await del(path);
        page.redirect('/fruits');
    }
    return html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${fruit.imageUrl}" alt="example1" />
            <p id="details-title">${fruit.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>
                ${fruit.description}
                  </p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">
                      ${fruit.nutrition}
                        </p>
              </div>
            ${isOwner ? html`
                <div id="action-buttons">
                <a href="" id="edit-btn">Edit</a>
                <a href="" @click=${deleteFruit} id="delete-btn">Delete</a>
                </div>
            ` : ""}
            </div>
        </div>
      </section>
    `
}

export async function details(id){
    const productInfo = await getInfo(id);
    render(detailsView(productInfo), document.querySelector('main'));
}

async function getInfo(id){
    const data = await get(url + id);
    return data;
}