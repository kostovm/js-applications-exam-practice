import { html, render } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";
import { updateNav } from "../app.js";
import { post } from "../api.js";

const registerTemplate = () => html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="login-form" @submit="${onSubmit}">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">login</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
`

export async function registerView() {
    render(registerTemplate(), document.querySelector('body main'));
}

async function onSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('re-password');

    if (email == "" || password == "" || rePass ==""){
        alert ('All fields are required');
        throw new Error('All fields are required')
    }

    if (password !== rePass){
        alert ('Passwords do not match');
        throw new Error('Passwords do not match');
    }

    const data = await post('/users/register', {email, password});
        const userData = {
            id: data._id,
            email: data.email,
            accessToken: data.accessToken
        }
        sessionStorage.setItem('userData', JSON.stringify(userData));
        updateNav();
        page.redirect('/catalog');
    }