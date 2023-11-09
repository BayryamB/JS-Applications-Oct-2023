import {loadHomePage} from "./homeView.js";
import {loadDetails} from './loadDetails.js';
loadHomePage();
const homeBtn = document.querySelector('nav a');
homeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loadHomePage();
});
//need fixes for loading  home page