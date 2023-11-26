import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { post } from "../services/requester.js";
const url = '/data/fruits';

function createTemlate(){
    return html`
        <section id="create">
          <div class="form">
            <h2>Add Fruit</h2>
            <form class="create-form" @submit=${onCreate}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image"
              />
              <textarea
              id="fruit-description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="fruit-nutrition"
              name="nutrition"
              placeholder="Nutrition"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fruit</button>
            </form>
          </div>
        </section>
    `
}

async function onCreate(e){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const imageUrl = formData.get('imageUrl');
    const description = formData.get('description');
    const nutrition = formData.get('nutrition');
    if(!name || !imageUrl || !description || !nutrition){
        return alert('All fields are required');
    }
    try {
        const response = await post(url, {name, imageUrl, description, nutrition});
        page.redirect('/fruits');
    } catch (error) {
        return alert(error.message);
    }
}
export function create(){
    return render(createTemlate(), document.querySelector('main'));
}