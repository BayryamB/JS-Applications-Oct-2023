import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { get, del, put } from "../services/requester.js";
import { userService } from "../services/userService.js";

const url = '/data/fruits/';
let info = '';

function detailsView(fruit){
    info = fruit;
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
                <a href="" @click=${editFruit} id="edit-btn">Edit</a>
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
    window.history.pushState({}, '', `/details/${id}`);
    render(detailsView(productInfo), document.querySelector('main'));
}
function editFruit(e){
    e.preventDefault();
    const content = html`
        <section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                value="${info.name}"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                value="${info.imageUrl}"
                placeholder="Fruit Image URL"
              />
              <textarea
                id="fruit-description"
                name="description"
                placeholder="Description"
                rows="10"
                cols="50"
              >${info.description}</textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                placeholder="Nutrition"
                rows="10"
                cols="50"
              >${info.nutrition}</textarea>
              <button @click=${onSubmit} type="submit">post</button>
            </form>
          </div>
        </section>
    `;
    render(content, document.querySelector('main'));
}
async function onSubmit(e){
    e.preventDefault();
    const formData = new FormData(document.querySelector('.edit-form'));
    const name = formData.get('name');
    const imageUrl = formData.get('imageUrl');
    const description = formData.get('description');
    const nutrition = formData.get('nutrition');
    const id = info._id;
    const url = '/data/fruits/' + id;
    if(!name || !imageUrl || !description || !nutrition){
        return alert('All fields are required');
    }
    try {
        const response = await put(url, {name, imageUrl, description, nutrition});
        details(id);
    } catch (error) {
        return alert(error.message);
    }
}
async function getInfo(id){
    const data = await get(url + id);
    return data;
}