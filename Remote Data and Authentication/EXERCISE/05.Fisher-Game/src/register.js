const formRef = document.getElementById('register-view');

formRef.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get('email');
    const password = form.get('password');
    const repass = form.get('rePass');
    
    if(!email || !password || !repass || repass !== password) {
        throw new Error ('Invalid email or password');
    }
    const uriReg = `http://localhost:3030/users/register`
    const registerData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password" : password.toString(),
        })
    }
    
    try {
        const response = await fetch(uriReg, registerData);
        const data = await response.json();
        console.log(data);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("userId", data._id);
        window.location.href = "index.html";
    } catch (error) {
        throw new Error ('Problem fetching data');
    }

});