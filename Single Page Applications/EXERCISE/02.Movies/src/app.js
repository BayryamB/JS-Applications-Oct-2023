import { registerPlugin } from "./signUp.js";
import { login } from "./formLogin.js";
import { logout } from "./logout.js";

export function loadHome(params) {
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
    let registered = [];
    function isLogedUser() {
        console.log(`working`);
        if(localStorage.length > 0) {
            loginBtn.style.display = 'none';
            registerBtn.style.display = 'none';
            welcomeMessage.textContent = `Welcome ${localStorage.getItem('email')}`;
        }
    }
    isLogedUser();
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        registerPlugin(registered);
        
    });

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        login(registered);
    });

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });

    }   

    navBarLogic();
}
loadHome();