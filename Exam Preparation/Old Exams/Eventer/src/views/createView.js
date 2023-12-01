import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { post } from "../services/requester.js";
const url = '/data/events';

function createTemlate(){
    return html`
        <section id="create">
          <div class="form">
            <h2>Add Event</h2>
            <form class="create-form" @submit=${onCreate}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image URL"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
            />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>
    `;
}

async function onCreate(e){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const imageUrl = formData.get('imageUrl');
    const category = formData.get('category');
    const description = formData.get('description');
    const date = formData.get('date');
    if(!name || !imageUrl || !category || !description || !date){
        return alert('All fields are required');
    }

    try {
        const response = await post(url, {name, imageUrl, category, description, date});
        page.redirect('/events');
    } catch (error) {
        return alert(error.message);
    }
}
export function create(){
    return render(createTemlate(), document.querySelector('main'));
}