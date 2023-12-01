import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { userService } from "./services/userService.js";
import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import { registerPage } from "./views/registerView.js";
import { logoutPage } from "./views/logout.js";
import { create } from "./views/createView.js";
import { dashboard } from "./views/dashboardView.js";
import { detailsPage } from "./views/detailsView.js";
import { edit } from "./views/editView.js";
import { deleteView } from "./views/deleteView.js";

page.start();
updateNav();
page.redirect('/');

page('/', homeView);
page('/login', loginView);
page('/register', registerPage);
page('/logout', logoutPage);
page('/add', create);
page('/dashboard', dashboard);
page('/create', create);
page('/details/:id', detailsPage);
page('/edit/:id', edit);
page('/delete/:id', deleteView);


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