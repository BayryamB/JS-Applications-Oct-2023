import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { get, put } from "../services/requester.js";
const url = '/data/motorcycles/';

function detailsTemplate(data){
    return html`
        <section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
              <form class="edit-form" @submit=${(e) => {e.preventDefault(); onEdit(data._id)}}>
                <input
                  type="text"
                  name="model"
                  value="${data.model}"
                  id="model"
                  placeholder="Model"
                />
                <input
                  type="text"
                  name="imageUrl"
                  value="${data.imageUrl}"
                  id="moto-image"
                  placeholder="Moto Image"
                />
                <input
                type="number"
                name="year"
                value="${data.year}"
                id="year"
                placeholder="Year"
              />
              <input
              type="number"
              name="mileage"
              value="${data.mileage}"
              id="mileage"
              placeholder="mileage"
            />
            <input
              type="number"
              name="contact"
              value="${data.contact}"
              id="contact"
              placeholder="contact"
            />
              <textarea
                id="about"
                name="about"
                placeholder="about"
                rows="10"
                cols="50"
              >${data.about}</textarea>
                <button type="submit">Edit Motorcycle</button>
              </form>
          </div>
        </section>
    `;
}
async function onEdit(id){
    const formData = new FormData(document.querySelector('.edit-form'));
    const model = formData.get('model');
    const imageUrl = formData.get('imageUrl');
    const year = formData.get('year');
    const mileage = formData.get('mileage');
    const contact = formData.get('contact');
    const about = formData.get('about');
    if(!model || !imageUrl || !year || !mileage || !contact || !about){
        return alert('All fields are required');
    }
    const response = await put(url + id, {model, imageUrl, year, mileage, contact, about});
    page.redirect('/details/' + id);
}

export async function edit(ctx){
    const id = ctx.params.id;
    const data = await get(url + id);
    return (render(detailsTemplate(data), document.querySelector('main')));
}