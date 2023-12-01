import { del } from "../services/requester.js";
import page from "../../node_modules/page/page.mjs";

export async function deleteView(ctx) {
    if(confirm('Are you sure you want to delete this offer?')){
        const id = ctx.params.id;
        await del(`/data/offers/${id}`);
        page.redirect('/dashboard');
    }
}