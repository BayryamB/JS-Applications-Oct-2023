export function isAuth() {
    return JSON(localStorage.getItem('userData'));
    
}