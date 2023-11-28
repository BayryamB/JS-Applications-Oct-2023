import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { userService } from "../services/userService.js";
import { post } from "../services/requester.js";
import { updateNav } from "../app.js";
const url = '/users/register';


function registerView () {
    return html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onRegister}>
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
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
    `
}

async function onRegister(e){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');
    if(!email || !password || !rePass){
        return alert('All fields are required');
    }else if(rePass !== password){
        return alert('The passwords are different');
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
export function registerPage() {
    return (render(registerView(), document.querySelector('.container')));
}