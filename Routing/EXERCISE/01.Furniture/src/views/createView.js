import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { post } from "../services/requester.js";
const url = ''; //TO ADD URL

function createTemlate(){
    return html`
    //CREATE SECTION
    `;
    //     @submit=${onCreate}
}

async function onCreate(e){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    // ADD PARAMS



    if( !name /*ADD PARAMS*/){
        return alert('All fields are required');
    }
    try {
        const response = await post(url, {name, /*ADD PARAMS*/});
        page.redirect('// REDIRECT TO DETAILS PAGE');
    } catch (error) {
        return alert(error.message);
    }
}
export function create(){
    return render(createTemlate(), document.querySelector('main'));
}