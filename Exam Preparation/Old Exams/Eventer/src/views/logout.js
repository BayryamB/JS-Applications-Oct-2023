import { get } from "../services/requester.js";
import { userService } from "../services/userService.js";
import { updateNav } from "../app.js";


export async function logoutPage() {
    await get('/users/logout');
    userService.removeUserData();
    updateNav();
}