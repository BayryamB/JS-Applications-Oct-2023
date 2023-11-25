import page from "../../node_modules/page/page.mjs";
import { html, render} from "../../node_modules/lit-html/lit-html.js";
import { userService } from "../services/userService.js";

const header = document.querySelector('header');

function navbarView(userData){
    return html`
        <a id="logo" href="/"
          ><img id="logo-img" src="./images/logo.png" alt=""
        /></a>

        <nav>
          <div>
            <a href="/dashboard">Products</a>
          </div>
            ${userData 
            ? html`<div class="user">
            <a href="/create">Add Product</a>
            <a href="/logout">Logout</a>
          </div>`
            : html`<div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>`}
          
        </nav>
    `
}

export function navbar(ctx, next) {
    const userData = userService.getUserData();
    render(navbarView(userData), header);
    next();
}
