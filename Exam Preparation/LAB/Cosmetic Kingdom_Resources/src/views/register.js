import { post } from "../services/requester.js";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { userService } from "../services/userService.js";
import page from "../../node_modules/page/page.mjs";

function registerView(){
    return html`
        <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="register-form" @submit=${onRegister}>
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
    `
}

export function register() {
    render(registerView(), document.querySelector('main'));
}

async function onRegister(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('re-password');
    if(email == '' || password == '' || rePass == ''){
        return alert('All fields are required');
    }
    if(password != rePass){
        return alert('Passwords don\'t match');
    }
    const data = await post('/users/register', {
        email,
        password
    });
    userService.setUserData(data);
    page.redirect('/dashboard');
}