const loginBtnRef = document.getElementById('login');
const registerBtnRef = document.getElementById('register');
const logoutBtnRef = document.getElementById('logout');
const homePageRef = document.getElementById('home');
const welcomingMsgRef = document.querySelector('.email span');
const catchesFieldsetRef = document.getElementById('catches');
const loadBtnRef = document.querySelector('.load');

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
catchesFieldsetRef.innerHTML = '';
loadBtnRef.addEventListener('click', async(e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3030/data/catches`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            //
        }
    });
    const data = await response.json();
    for (const obj in data) {
        const angler = data[obj].angler;
        const bait = data[obj].bait;
        const captureTime = data[obj].captureTime;
        const location = data[obj].location;
        const weight = data[obj].weight;
        const species = data[obj].species;
        const ownerId = data[obj]._ownerId;
        let div = document.createElement("div");
        div.classList.add("catch");
        div.innerHTML = `
        <label>Angler</label>
        <input type="text" class="angler" value="${angler}">
        <label>Weight</label>
        <input type="text" class="weight" value="${weight}">
        <label>Species</label>
        <input type="text" class="species" value="${species}">
        <label>Location</label>
        <input type="text" class="location" value="${location}">
        <label>Bait</label>
        <input type="text" class="bait" value="${bait}">
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${captureTime}">
        <button class="update" data-id="${ownerId}" disabled>Update</button>
        <button class="delete" data-id="${ownerId}" disabled>Delete</button>
        `;
        catchesFieldsetRef.appendChild(div);
        if(ownerId === sessionStorage.getItem('userId')){
            const btns = div.querySelectorAll('button');
            let couplebtns = Array.from(btns);
            couplebtns.forEach((btn) => {
                btn.disabled = false;
            });
        }
        
    }
    
});

