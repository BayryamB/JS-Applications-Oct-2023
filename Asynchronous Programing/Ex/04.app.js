function lockedProfile() {
    const baseLink = `http://localhost:3030/jsonstore/advanced/profiles`;
    const mainDiv = document.getElementById('main');
    const profileDiv = document.querySelector('.profile');
    mainDiv.removeChild(profileDiv);
    getProfile(baseLink);
    async function getProfile(baseLink) {
        try {
            const info = await fetch(baseLink);
            const data = await info.json();
            createProfile(data)
        } catch (error) {
            console.log(`Error`);
        }
    }
    function createProfile(data) {
        let keys = Object.keys(data);
        let count = 0;
        for (const key of keys) {
            const user = data[key];
            count++;
            makeContent(user, count);
            let divHiden = document.getElementById(`user${count}HiddenFields`);
            divHiden.style.display = 'none';
        }
    }
    function makeContent(user, count) {
        const div = document.createElement('div');
        div.classList.add('profile');
        div.innerHTML = `
        <img src="./iconProfile2.png" class="userIcon" />
        <labbel>Lock</labbel>
        <input type="radio" name="user1Locked" value="lock" checked>
        <labbel>Unlock</labbel>
        <input type="radio" name="user1Locked" value="unlock" ><br>
        <hr>
        <label>Username</label>
        <input type="text" name="user1Username" value="${user.username}" disabled readonly />
        <div id="user${count}HiddenFields">
            <hr>
            <label>Email:</label>
            <input type="email" name="user1Email" value="${user.email}" disabled readonly />
            <label>Age:</label>
            <input type="email" name="user1Age" value="${user.age}" disabled readonly />
        </div>
        <button>Show more</button>`;
        const inputs = div.querySelectorAll('input');
        let locked = inputs[0];
        let unlock = inputs[1];
        locked.addEventListener('change', () => {
            locked.checked = true;
            unlock.checked = false;
        })
        unlock.addEventListener('change', () => {
            locked.checked = false;
            unlock.checked = true;
        })
        const btnShowInfo = div.querySelector('button');
        btnShowInfo.addEventListener('click', (e) => {
            const profileDiv = e.target.parentNode;
            const divHiden = document.getElementById(`user${count}HiddenFields`);
            if (unlock.checked == true && locked.checked == false) {
                divHiden.style.display = 'block';
                e.target.textContent = `Hide it`;
                e.target.addEventListener('click', (ev) => {
                    if (unlock.checked == true && locked.checked == false) {
                        divHiden.style.display = 'none';
                        e.target.textContent = `Show more`;
                    }
                });
            }
        });
        mainDiv.appendChild(div);

    }

}