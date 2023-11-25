import { post } from "../services/requester.js";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { userService } from "../services/userService.js";
import page from "../../node_modules/page/page.mjs";
import { navbar } from "./navbar.js";
function goLogin (){
    return html `
    <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${onLogin}>
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
    `
}
export function login() {
    render(goLogin(), document.querySelector('main'));
}

async function onLogin(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    if(email == '' || password == ''){
        return alert('All fields are required');
    }
    const data = await post('/users/login', {
        email,
        password
    });
    userService.setUserData(data);
    page.redirect('/dashboard');
}