import page from "../node_modules/page/page.mjs";
import { navbarView } from "./navbarView.js";
import { loginView } from "./loginView.js";
import { homeView } from "./homeView.js";
import { isAuth } from "./isAuth.js";

page(isAuth)
page(navbarView);
page('/', homeView);
page('/login', loginView);
page.start();