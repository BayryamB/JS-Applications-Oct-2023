import { del } from "../services/requester.js";
import page from "../../node_modules/page/page.mjs";
export function onDelete(obj) {
    const id = obj._id;
    del('/data/products/' + id);
    page.redirect('/dashboard');
}

