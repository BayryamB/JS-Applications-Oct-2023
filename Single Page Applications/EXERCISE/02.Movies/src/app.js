import { registerPlugin } from "./register.js";
import { loginPlugin } from "./login.js";
import { logoutPlugin } from "./logout.js";
function navBarLogic() {
    const navBar = document.querySelector('nav');
    const homePage = navBar.querySelectorAll('a')[0];
    const welcomeMessage = navBar.querySelectorAll('a')[1];
    const logoutBtn = navBar.querySelectorAll('a')[2];
    const loginBtn = navBar.querySelectorAll('a')[3];
    const registerBtn = navBar.querySelectorAll('a')[4];
    
    registerBtn.addEventListener('click', () => {
        registerPlugin();
    });
    loginBtn.addEventListener('click', () => {
        loginPlugin();
    });
    logoutBtn.addEventListener('click', () => {
        logoutPlugin();
        localStorage.clear();
        
    });

    
}   
navBarLogic();