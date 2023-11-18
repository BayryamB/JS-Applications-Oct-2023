import { html, render } from "./node_modules/lit-html/lit-html.js";

import { loader } from "./loader.js";
import { loadBooks } from "./loadBooks.js";
import { addForm } from "./addForm.js";

const loadBooksUrl = `http://localhost:3030/jsonstore/collections/books/`;
const mainContainer = document.querySelector('#container');
const formRef = document.querySelector('#form');
function solve() {
    const startPage = loader();
    render(startPage, mainContainer);
    addForm(formRef);
    const loadButton = document.querySelector('#loadBooks');
    loadButton.addEventListener('click', (e) => {
        e.preventDefault();
        loadBooks(loadBooksUrl, mainContainer);
    });
    

}
solve();