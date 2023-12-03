import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { userService } from "../services/userService.js";
import { post } from "../services/requester.js";
import { updateNav } from "../app.js";
const url = '/users/login'; //TO VERIFY

function loginViewTemplate() {
    return html`
    //SECTION
    `;
    //<form class="login-form" @submit=${onLogin}> 
}
async function onLogin(e){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log(email, password); //!!!
    if(!email || !password){
        return alert('All fields are required');
    }
    try {
        const response = await post(url, {email, password});
        userService.setUserData(response);
        updateNav();
        page.redirect('/'); // VERYFY REDIRECT
    } catch (error) {
        return alert(error.message);
    }
}
export function loginView() {
    return render(loginViewTemplate(), document.querySelector('main'));
}

/*
{ "email": "peter@abv.bg", "password": "123456" }
{ "email": "john@abv.bg", "password": "123456" }
*/