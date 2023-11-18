import { register } from "./tools/register.js";

const nav = document.querySelector('nav');
const btnsRef = Array.from(nav.querySelectorAll('a'));
const welcomingMsg =  nav.querySelector('p');


btnsRef.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const btnValue = e.target.textContent;
        switch (btnValue) {
            case "Home":
                
                break;
        
            case "Login":

                break;

            case "Logout":
                
                break;

            case "Register":
                register();
                break;
        }
    });
})