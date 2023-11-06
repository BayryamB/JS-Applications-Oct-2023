const loginBtnRef = document.getElementById('login');
const registerBtnRef = document.getElementById('register');
const logoutBtnRef = document.getElementById('logout');
const homePageRef = document.getElementById('home');
const welcomingMsgRef = document.querySelector('.email span');

if(sessionStorage.getItem('userId')){
    loginBtnRef.style.display = 'none';
    registerBtnRef.style.display = 'none';
    welcomingMsgRef.textContent = sessionStorage.getItem('email');
}else{
    welcomingMsgRef.textContent = `guest`
    logoutBtnRef.style.display = 'none';
}

logoutBtnRef.addEventListener('click', async(e) => {
    const response = await fetch(`http://localhost:3030/users/logout`, {
        method: 'GET',
        headers: {
            "x-authorization": sessionStorage.getItem("accessToken")
        }
    })
    sessionStorage.clear();
    window.location.href = "index.html";
});