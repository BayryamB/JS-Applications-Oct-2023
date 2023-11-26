import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { userService } from "./services/userService.js";
import { homeView } from "./views/homePage.js";
import { fruitsView } from "./views/fruitsPage.js";
import { loginPage } from "./views/loginPage.js";
import { registerPage } from "./views/registerPage.js";
import { logoutPage } from "./views/logoutPage.js";
import { create } from "./views/addPage.js";
import { details } from "./views/detailsPage.js";
//import { requester } from "./services/requester.js";

page.start();
updateNav();
page.redirect('/');

page('/', homeView);
page('/fruits', fruitsView);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutPage);
page('/add', create);
page('/details/:id', details);



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