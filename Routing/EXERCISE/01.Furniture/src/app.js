import page from '../node_modules/page/page.mjs';
import { catalog } from '../views/catalog.js';
import { create } from '../views/create.js';
import { login } from '../views/login.js';
import { furniture } from '../views/my-furniture.js';
import { register } from '../views/register.js';

page("/", catalog)
page("/catalog", catalog)
page("/create", create)
page("/login", login)
page("/register", register)
page("/myFurniture", furniture)

page.start();