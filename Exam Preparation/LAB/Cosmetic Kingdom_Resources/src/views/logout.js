import page from "../../node_modules/page/page.mjs";
import { get } from "../services/requester.js";
import { userService } from "../services/userService.js";
import { navbar } from "./navbar.js";
export function logout() {
    get('/users/logout');
    userService.removeUserData();
    page.redirect('/dashboard');
}
