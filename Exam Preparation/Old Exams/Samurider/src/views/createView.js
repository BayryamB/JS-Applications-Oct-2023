import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { post } from "../services/requester.js";
const url = '/data/motorcycles';

function createTemlate(){
    return html`
        <section id="create">
          <h2>Add Motorcycle</h2>
          <div class="form">
            <h2>Add Motorcycle</h2>
            <form class="create-form" @submit=${onCreate}>
              <input
                type="text"
                name="model"
                id="model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="moto-image"
                placeholder="Moto Image"
              />
              <input
              type="number"
              name="year"
              id="year"
              placeholder="Year"
            />
            <input
            type="number"
            name="mileage"
            id="mileage"
            placeholder="mileage"
          />
          <input
            type="text"
            name="contact"
            id="contact"
            placeholder="contact"
          />
            <textarea
              id="about"
              name="about"
              placeholder="about"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Motorcycle</button>
            </form>
          </div>
        </section>
    `;
}

async function onCreate(e){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const model = formData.get('model');
    const imageUrl = formData.get('imageUrl');
    const year = formData.get('year');
    const mileage = formData.get('mileage');
    const contact = formData.get('contact');
    const about = formData.get('about');

    if( !model || !imageUrl || !year || !mileage || !contact || !about){
        return alert('All fields are required');
    }
    try {
        const response = await post(url, {model, imageUrl, year, mileage, contact, about});
        page.redirect('/dashboard');
    } catch (error) {
        return alert(error.message);
    }
}
export function create(){
    return render(createTemlate(), document.querySelector('main'));
}