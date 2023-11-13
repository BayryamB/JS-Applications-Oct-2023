import { loadHome } from "./loadHome.js";
export function logout(){
    console.log(`logout is working`);
    localStorage.clear();
    loadHome();
}