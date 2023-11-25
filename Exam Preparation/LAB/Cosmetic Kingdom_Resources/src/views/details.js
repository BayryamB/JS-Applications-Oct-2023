import { userService } from "../services/userService.js";
import { html, render} from "../../node_modules/lit-html/lit-html.js";
import { post } from "../services/requester.js";
import page from "../../node_modules/page/page.mjs";
import { onEdit } from "./edit.js";
function detailsView(obj){
    const user = userService.getUserData();
    function isCreator() {
        if(obj._ownerId == user._id){
            return html`
            <div id="action-buttons">
              <a href="/edit" @click=${callEdit} id="edit-btn">Edit</a>
              <a href="/delete" @click=${onEdit} id="delete-btn">Delete</a>
            </div>
            `;
        }else{
            const likes = isLoged();

            return likes;
        }
        
    }
    function callEdit(event){
        event.preventDefault();
        onEdit(obj);
    }
    function isLoged(){
        if(user){
            return html`
            <div id="action-buttons">
                <a href="" id="like-btn">Like</a>
            </div>
            `;
        }
    }
    return html`
            <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${obj.imageUrl}" alt="example1" />
            <p id="details-title">${obj.name}</p>
            <p id="details-category">
              Category: <span id="categories">${obj.category}</span>
            </p>
            <p id="details-price">
              Price: <span id="price-number">${obj.price}</span>$</p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Bought: <span id="buys">0</span> times.</h4>
                <span
                  >${obj.description}</span
                >
              </div>
            </div>

            <!--Edit and Delete are only for creator-->
            ${isCreator()}
          </div>
        </section>
    `
}
export function details(obj) {
    render(detailsView(obj), document.querySelector('main'));
}