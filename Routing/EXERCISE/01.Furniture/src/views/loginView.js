import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { userService } from "../services/userService.js";
import { post } from "../services/requester.js";
import { updateNav } from "../app.js";
const url = '/users/login'; //TO VERIFY

function loginViewTemplate() {
    return html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onLogin}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
    `
}
async function onLogin(e){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log(email, password);
    if(!email || !password){
        return alert('All fields are required');
    }
    try {
        const response = await post(url, {email, password});
        userService.setUserData(response);
        updateNav();
        page.redirect('/');
    } catch (error) {
        return alert(error.message);
    }
}
export function loginView() {
    return render(loginViewTemplate(), document.querySelector('.container'));
}

/*
{ "email": "peter@abv.bg", "password": "123456" }
{ "email": "john@abv.bg", "password": "123456" }
*/