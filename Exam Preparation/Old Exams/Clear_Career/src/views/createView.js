import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { post } from "../services/requester.js";
const url = '/data/offers';

function createTemlate(){
    return html`
        <section id="create">
          <div class="form">
            <h2>Create Offer</h2>
            <form class="create-form" @submit=${onCreate}>
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
              ></textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
    `;
}

async function onCreate(e){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title');
    const imageUrl = formData.get('imageUrl');
    const category = formData.get('category');
    const description = formData.get('description');
    const requirements = formData.get('requirements');
    const salary = formData.get('salary');


    if( !title || !imageUrl || !category || !description || !requirements || !salary){
        return alert('All fields are required');
    }
    try {
        const response = await post(url, {title, imageUrl, category, description, requirements, salary});
        page.redirect('/dashboard');
    } catch (error) {
        return alert(error.message);
    }
}
export function create(){
    return render(createTemlate(), document.querySelector('main'));
}