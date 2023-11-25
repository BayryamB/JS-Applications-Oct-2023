import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { userService } from "./services/userService.js";
//import { requester } from "./services/requester.js";

page.start();
updateNav();

function updateNav(){
    const userData = userService.getUserData();
    if(userData){
        document.querySelector('.user').style.display = 'inline-block';
        document.querySelector('.guest').style.display = 'none';
    }else{
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'inline-block';
    }
}