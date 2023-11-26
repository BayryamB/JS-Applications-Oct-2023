import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";

function logoutView () {
    console.log('Logout');
}

export function logoutPage() {
    return logoutView();
}