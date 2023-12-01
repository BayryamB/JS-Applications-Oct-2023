import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { del } from "../services/requester.js";


const url = '/data/motorcycles/';

export async function deleteView(ctx){
    const id = ctx.params.id;
    if(confirm('Are you sure you want to delete this motorcycle?')){
        await del(url + id);
        page.redirect('/dashboard');
    }
}