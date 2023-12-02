import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { get, post } from "../services/requester.js";
import { userService } from "../services/userService.js";
const url = '/data/characters/';