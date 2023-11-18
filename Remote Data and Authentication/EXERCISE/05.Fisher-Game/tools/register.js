export async function register() {
    const section = document.getElementById('views');
    section.innerHTML = `
        <section id="register-view">
            <h2>Register</h2>
            <form id="register">
                <label>Email: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <label>Repeat: <input type="password" name="rePass"></label>
                <p class="notification"></p>
                <button>Register</button>
            </form>
        </section>
    `

    const formRef = document.getElementById('register-view');

    formRef.addEventListener('submit', async (e) => {
    e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        const password = form.get('password');
        const repass = form.get('rePass');

        if (!email || !password || !repass || repass !== password) {
            throw new Error('Invalid email or password');
        }
        const uriReg = `http://localhost:3030/users/register`
        const registerData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password.toString(),
            })
        }

        try {
            const response = await fetch(uriReg, registerData);
            if(response.status !== 200) {
                throw new Error('The user already exists');
            }
            const data = await response.json();
            sessionStorage.setItem("email", data.email);
            sessionStorage.setItem("accessToken", data.accessToken);
            sessionStorage.setItem("userId", data._id);
            window.location.href = "home";
        } catch (error) {
            throw new Error('Problem fetching data');
        }

    });
}
