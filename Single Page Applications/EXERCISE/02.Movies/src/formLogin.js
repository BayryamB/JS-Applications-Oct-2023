export function login(register){
    const section = document.getElementById('form-login');
    section.innerHTML = `
    <form
    id="login-form"
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

    <button type="submit" class="btn btn-primary">Login</button>
  </form>
    `
    const form = document.getElementById('login-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        console.log(email, register);
        if(!register.includes(email)){
            throw new Error ('Email is not registered');
        }else{
            section.innerHTML = '';
        }
    });
}
