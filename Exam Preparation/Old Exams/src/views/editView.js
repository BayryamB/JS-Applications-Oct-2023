import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { get, put} from "../services/requester.js";
function editTemplate(info){
    return html`
        <section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form class="edit-form" @submit=${(e) => {e.preventDefault(); onEdit(info._id)}}>
              <input
                type="text"
                name="name"
                id="name"
                value="${info.name}"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                value="${info.imageUrl}"
                placeholder="Event Image"
              />
              <input
                type="text"
                name="category"
                value="${info.category}"
                id="event-category"
                placeholder="Category"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              >${info.description}</textarea>
              
              <label for="date-and-time">Event Time:</label>
              <input
              type="text"
              name="date"
              value="${info.date}"
              id="date"
              placeholder="When?"
            />

              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
    `;
}
function onEdit(id){
    const formData = new FormData(document.querySelector('.edit-form'));
    const name = formData.get('name').trim();
    const imageUrl = formData.get('imageUrl').trim();
    const category = formData.get('category').trim();
    const description = formData.get('description').trim();
    const date = formData.get('date').trim();
    const data = {
        name,
        imageUrl,
        category,
        description,
        date
    }
    if(!name || !imageUrl || !category || !description || !date){
        return alert('Please fill all fields.');
    }
    put('/data/events/' + id, data);
    page.redirect('/details/' + id);
}
export async function edit(ctx){
    const id = ctx.params.id;
    const info = await get('/data/events/' + id);
    render(editTemplate(info), document.querySelector('main'));
}