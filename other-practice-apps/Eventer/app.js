import page from './node_modules/page/page.mjs'
import { catalogView } from './views/catalogView.js'
import { createView } from './views/createView.js'
import { loginView } from './views/loginView.js'
import { logoutView } from './views/logoutView.js'
import { registerView } from './views/registerView.js'
import { editView } from './views/editView.js'
import { detailsView } from './views/detailsView.js'
import {homePageView} from './views/homePageView.js'

export function updateNav(){
    const userNav = document.querySelector('.user');
    const guestNav = document.querySelector('.guest');

    if (sessionStorage.getItem('userData') == null){
        userNav.style.display = "none";
        guestNav.style.display = "inline";
    }else{
        userNav.style.display = "inline";
        guestNav.style.display = "none";
    }
}

updateNav();
document.getElementById('logoutBtn').addEventListener('click', logoutView);

page('/', homePageView);
page('/index.html', homePageView)
page('/catalog', catalogView)
page('/create', createView);
page('/login', loginView);
page('/register', registerView);
page('/edit/:id', editView);
page('/details/:id', detailsView);
page.start();