import { render, html } from "./node_modules/lit-html/lit-html.js";
import { addForm } from "./addForm.js";

export async function loadBooks(url, mainContainer){
    const tbody = mainContainer.querySelector('tbody');
    const request = await fetch(url);
    const data = await request.json();
    const dataArr = Object.keys(data);
    const content = html`
                    ${dataArr.map(obj => contentMaker(data[obj]))}
    `
    render(content, tbody);
    const buttonsArr = Array.from(tbody.querySelectorAll('button'));
    buttonsArr.forEach(button => button.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(`todo ${e.target.textContent}`);
    }));
    function contentMaker(obj){
        const author = obj.author;
        const title = obj.title;
        return html`
                <tr>
                    <td>${title}</td>
                    <td>${author}</td>
                    <td>
                        <button>Edit</button>
                        <button>Delete</button>
                    </td>
                </tr>
        `
    }
}