import { userService } from "../services/userService.js";
import { updateNav } from "../app.js";


export async function logoutPage() {
    userService.removeUserData();
    updateNav();
}