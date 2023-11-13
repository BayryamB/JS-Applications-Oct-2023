import { loadHome } from "./loadHome.js";
export function logedCheck (){
    if(localStorage.length > 0){
        return true;
    }
    return false;
}