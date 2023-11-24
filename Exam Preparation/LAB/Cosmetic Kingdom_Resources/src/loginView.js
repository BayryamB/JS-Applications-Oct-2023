import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { userService } from "./userService.js";

const main = document.querySelector('main');

function loginTemplate(){
    return html `
        <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${loginHandler}>
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="#">Create an account</a>
              </p>
            </form>
          </div>
        </section>
    `
}
function loginHandler(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    if(!email || !password){
        alert('Please enter a valid email and password');
        throw new Error('Please fill the fields');
    }
    const user = {
        email,
        password
    }
    console.log(user);
}

export function loginView(ctx, next){
    render(loginTemplate(), main)
}
