import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";

function registerView () {
    console.log('Register');
}

export function registerPage() {
    return registerView();
}