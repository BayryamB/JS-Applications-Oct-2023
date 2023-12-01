import { del } from "../services/requester.js";
import page from "../../node_modules/page/page.mjs";
export async function deleteEvent(ctx){
    const id = ctx.params.id;
    let confirmed = confirm('Are you sure you want to delete this event?');
    if(confirmed){
        const response = del('/data/events/' + id);
        page.redirect('/events');
    }
}