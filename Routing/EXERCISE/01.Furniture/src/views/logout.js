import { userService } from "../services/userService.js";
import { updateNav } from "../app.js";
import { get } from "../services/requester.js";

export async function logoutPage() {
    const response = await get('/users/logout');
    userService.removeUserData();
    updateNav();
}