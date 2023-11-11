import { registerPlugin } from "./register.js";
import { loginPlugin } from "./login.js";
import { logoutPlugin } from "./logout.js";
import { homeView } from "./home.js";   
import { footer } from "./footer.js";
const homePageSection = document.getElementById('home-page');
const addMovieSection = document.getElementById('add-movie');
const movieExampleSection = document.getElementById('movie-example');
const editMovieSection = document.getElementById('edit-movie');
const formLogin = document.getElementById('form-login');
const formSignUp = document.getElementById('form-sign-up');

function navBarLogic() {
    const navBar = document.querySelector('nav');
    const homePage = navBar.querySelectorAll('a')[0];
    const welcomeMessage = navBar.querySelectorAll('a')[1];
    const logoutBtn = navBar.querySelectorAll('a')[2];
    const loginBtn = navBar.querySelectorAll('a')[3];
    const registerBtn = navBar.querySelectorAll('a')[4];
    
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        homePageSection.style.display = 'none';
        addMovieSection.style.display = 'none';
        movieExampleSection.style.display = 'none';
        editMovieSection.style.display = 'none';
        formLogin.style.display = 'none';
        formSignUp.style.display = 'block';
        registerPlugin();
    });
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginPlugin();
    });
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logoutPlugin();
        localStorage.clear();
        
    });

}   

navBarLogic();