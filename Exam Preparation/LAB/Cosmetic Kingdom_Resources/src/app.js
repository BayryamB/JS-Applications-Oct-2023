import page from "../node_modules/page/page.mjs";
import { create } from "./views/create.js";
import { dashboard } from "./views/dashboard.js";
import { details } from "./views/details.js";
import { home } from "./views/home.js";
import { login } from "./views/login.js";
import { logout } from "./views/logout.js";
import { navbar } from "./views/navbar.js";
import { register } from "./views/register.js";


page(navbar);
page('/', home);
page('/logout', logout);
page('/create', create);
page('/login', login);
page('/register', register);
page('/dashboard', dashboard);
page.start();


