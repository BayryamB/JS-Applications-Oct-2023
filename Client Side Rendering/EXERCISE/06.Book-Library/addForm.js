import { html, render } from "./node_modules/lit-html/lit-html.js"

const url =  'http://localhost:3030/jsonstore/collections/books'
export function addForm(formRef) {
        const content = html`
            <form id="add-form">
                <h3>Add book</h3>
                <label>TITLE</label>
                <input type="text" name="title" placeholder="Title...">
                <label>AUTHOR</label>
                <input type="text" name="author" placeholder="Author...">
                <input type="submit" value="Submit">
            </form>
        `;
    
    render(content, formRef);

    const formEvent = formRef.querySelector('#add-form')
    .addEventListener('submit', (e) => {
        e.preventDefault();
        const title = e.target.querySelector('input[name="title"]').value;
        const author = e.target.querySelector('input[name="author"]').value;
        addNewBook(title, author);
    });

    async function addNewBook(title, author){
        const request = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "author": `${author}`,
                "title": `${title}`
              })
        });

    }
}