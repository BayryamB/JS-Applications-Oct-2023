import { render, html } from "./node_modules/lit-html/lit-html.js";
import { addForm } from "./addForm.js";

const formRef = document.querySelector('#form');

export async function loadBooks(url, mainContainer) {
    const tbody = mainContainer.querySelector('tbody');
    try {
        const request = await fetch(url);
        const data = await request.json();
        const dataArr = Object.keys(data);

        const content = html`
                        ${dataArr.map(obj => contentMaker(data[obj], obj))}
        `
        render(content, tbody);
    } catch (error) {
        throw new Error('Error loading')
    }

    function contentMaker(obj, objId) {
        const author = obj.author;
        const title = obj.title;
        const id = objId;
        return html`
                <tr .value=${id}>
                    <td>${title}</td>
                    <td>${author}</td>
                    <td>
                        <button @click=${editBook}>Edit</button>
                        <button @click=${deleteBook}>Delete</button>
                    </td>
                </tr>
        `
    }

    function editBook(e) {
        e.preventDefault();
        const formRef = document.querySelector('#form');
        const tr = e.target.parentElement.parentElement;
        let title = tr.querySelectorAll('td')[0].textContent;
        let author = tr.querySelectorAll('td')[1].textContent;
        let id = tr.value;
        const content = html`
            <form id="edit-form">
                <input type="hidden" name="id">
                <h3>Edit book</h3>
                <label>TITLE</label>
                <input type="text" name="title" .value=${title}>
                <label>AUTHOR</label>
                <input type="text" name="author" .value=${author}>
                <input type="submit" value="Save">
            </form>
        `;

        render(content, formRef);
        const editForm = document.getElementById('edit-form')
            .addEventListener('submit', (e) => {
                e.preventDefault();
                let title = e.target.querySelector('input[name="title"]');
                let author = e.target.querySelector('input[name="author"]');
                putEditBook(title, author, id);
                title.value = '';
                author.value = '';
                addForm(formRef);
            });

        async function putEditBook(title, author, id) {
            try {
                const request = await fetch(url + id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "author": `${author.value}`,
                        "title": `${title.value}`
                    })
                });
            } catch (error) {
                throw new Error('Could not edit book')
            }
        }
    }

    async function deleteBook(e) {
        e.preventDefault();
        try {
            const tr = e.target.parentElement.parentElement;
            let id = tr.value;
            const request = await fetch(url + id, {
                method: 'DELETE',
            });
        } catch (error) {
            throw new Error('Error deleting')
        }
    }
}