import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { userService } from "../services/userService.js";
import { get, put} from "../services/requester.js";

function detailsTemplate(data, ctx){
    return html`
            <section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form class="edit-form" @submit=${(e) => {e.preventDefault();onEdit(data)}}>
              <input
                type="text"
                name="title"
                value="${data.title}"
                id="job-title"
                placeholder="Title"
              />
              <input
                type="text"
                name="imageUrl"
                value="${data.imageUrl}"
                id="job-logo"
                placeholder="Company logo url"
              />
              <input
                type="text"
                name="category"
                value="${data.category}"
                id="job-category"
                placeholder="Category"
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
              >${data.description}</textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
              >${data.requirements}</textarea>
              <input
                type="text"
                name="salary"
                value="${data.salary}"
                id="job-salary"
                placeholder="Salary"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>`;
}

async function onEdit(data){
    const formData = new FormData(document.querySelector('.edit-form'));
    const title = formData.get('title');
    const imageUrl = formData.get('imageUrl');
    const category = formData.get('category');
    const description = formData.get('description');
    const requirements = formData.get('requirements');
    const salary = formData.get('salary');
    const id = data._id;
    if( !title || !imageUrl || !category || !description || !requirements || !salary){
        return alert('All fields are required');
    }
    try {
        await put(`/data/offers/${id}`, {title, imageUrl, category, description, requirements, salary});
        page.redirect('/dashboard');
    }catch (error) {
        return alert(error.message);
    }
}
export async function edit(ctx){
    const id = ctx.params.id;
    const data = await get(`/data/offers/${id}`);
    render(detailsTemplate(data), document.querySelector('main'));
}