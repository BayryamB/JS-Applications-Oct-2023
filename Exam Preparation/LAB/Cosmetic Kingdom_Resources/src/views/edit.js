import { userService } from "../services/userService.js";
import { html, render} from "../../node_modules/lit-html/lit-html.js";
import { put } from "../services/requester.js";
import page from "../../node_modules/page/page.mjs";

function editView(obj){
    return html`
            <section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
                type="text"
                name="name"
                id="name"
                value="${obj.name}"
                placeholder="Product Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                value="${obj.imageUrl}"
                placeholder="Product Image"
              />
              <input
                type="text"
                name="category"
                id="product-category"
                value="${obj.category}"
                placeholder="Category"
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              >${obj.description}</textarea>
              
              <input
                type="text"
                name="price"
                id="product-price"
                value="${obj.price}"
                placeholder="Price"
              />
              <button type="submit">post</button>
            </form>
          </div>
        </section>
    `;
    function onEdit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const imageUrl = formData.get('imageUrl');
        const category = formData.get('category');
        const description = formData.get('description');
        const price = formData.get('price');
        const id = obj._id;
        const data = {
            name,
            imageUrl,
            category,
            description,
            price
        }
        if(!name || !imageUrl || !category || !description || !price){
            return alert('All fields are required');
        }
        put('/data/products/' + id, data);
        page.redirect('/details/' + id);
    }
}

export function onEdit(obj){
    render(editView(obj), document.querySelector('main'));
}