import { showView, updateNav} from './util.js';

const section = document.querySelector('#form-sign-up');
const form = section.querySelector('form');

form.addEventListener('submit', onSubmit);

export function registerPage() {
    showView(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');
    const repassword = formData.get('repeatPassword');
    if(!email || !password || !repassword || password !== repassword || password.length < 6) {
        alert('Please enter a valid email or password');
        throw new Error ('Invalid email or password');
    }
    await register(email, password);
    form.reset();
    updateNav();
    homePage();
}

async function register(email, password) {
    try {
        const res = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
        alert(err.message);
        throw err;
    }
}