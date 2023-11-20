import { html, render } from "../node_modules/lit-html/lit-html.js";
import { post } from "../src/api.js";
import { userData } from "../src/getUserData.js";

const container = document.querySelector('.container');
const registerUrl = '/users/register';

export function register() {
    const content = html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onsubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
    `
    render(content, container);
    

    async function onsubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target)
        const {email, password, rePass} = Object.fromEntries(formData);
        const data = {
            email,
            password
        }

        if(!email || !password || !rePass || password !== rePass) {
            alert('Fill with correct info');
            throw new Error('Fill with correct info');
        }
        
        const request = await post(registerUrl, data);
        //Error , that gives me undefined
        console.log(request);
        userData.setUserData(request);
    }
    

}
