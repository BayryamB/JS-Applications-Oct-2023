import {app} from './app.js';
import {logedCheck} from './logedCheck.js';
export function registerPlugin (register){
    const section = document.getElementById('form-sign-up');
    section.innerHTML = `
        <form
          id="register-form"
          class="text-center border border-light p-5"
          action=""
          method=""
        >
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              class="form-control"
              placeholder="Email"
              name="email"
              value=""
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              placeholder="Password"
              name="password"
              value=""
            />
          </div>

          <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input
              id="repeatPassword"
              type="password"
              class="form-control"
              placeholder="Repeat-Password"
              name="repeatPassword"
              value=""
            />
          </div>

          <button type="submit" class="btn btn-primary">Register</button>
        </form>
    `
    const form = document.getElementById('register-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let email = document.getElementById(`email`).value;
        let password = document.getElementById(`password`).value;
        let repeatPassword = document.getElementById(`repeatPassword`).value;
        if (password === repeatPassword && password.length > 5) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          section.innerHTML = '';
          logedCheck();
        }else{
          throw new Error('Please enter a valid password');
        }
    });


}
