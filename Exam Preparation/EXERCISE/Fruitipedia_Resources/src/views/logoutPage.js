import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { get } from "../services/requester.js";
import { userService } from "../services/userService.js";
import { updateNav } from "../app.js";


export async function logoutPage() {
    await get('/users/logout');
    userService.removeUserData();
    updateNav();
}