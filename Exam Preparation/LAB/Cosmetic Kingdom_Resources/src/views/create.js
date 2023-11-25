import { userService } from "../services/userService.js";
import { html, render} from "../../node_modules/lit-html/lit-html.js";
import { post } from "../services/requester.js";
import page from "../../node_modules/page/page.mjs";

function createView(){
    const user = userService.getUserData();
    return html`
            <section id="create">
          <div class="form">
            <h2>Add Product</h2>
            <form class="create-form" @submit=${onCreate}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
              />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>
    `
}
export function create() {
    render(createView(), document.querySelector('main'));
}
function onCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const imageUrl = formData.get('imageUrl');
    const category = formData.get('category');
    const description = formData.get('description');
    const price = formData.get('price');
    if(!name || !imageUrl || !category || !description || !price){
        return alert('All fields are required');
    }
    const data = post('/data/products', {
        name,
        imageUrl,
        category,
        description,
        price
    })

    page.redirect('/dashboard');
}