import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { userService } from "./services/userService.js";
import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import { registerPage } from "./views/registerView.js";
import { logoutPage } from "./views/logout.js";
import { create } from "./views/createView.js";
import { productsView } from "./views/dashboardView.js";

page.start();
updateNav();
page.redirect('/');

page('/', homeView);
page('/login', loginView);
page('/register', registerPage);
page('/logout', logoutPage);
page('/dashboard', productsView);
page('/create', create);



export function updateNav(){
    const userData = userService.getUserData();
    if(userData){
        document.querySelector('.user').style.display = 'inline-block';
        document.querySelector('.guest').style.display = 'none';
    }else{
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'inline-block';
    }
}