document.querySelector('form').addEventListener('submit', onLoad);

async function onLoad(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get('email');
    const password = form.get('password');

    if (!email ||!password) {
        throw new Error('Invalid email or password');
    }
    const uriLogin = `http://localhost:3030/users/login`
    const loginData = {
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
        const response = await fetch(uriLogin, loginData);
        const data = await response.json();
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("userId", data._id);
    } catch (error) {
        throw new Error('Error fetching');
    }
}