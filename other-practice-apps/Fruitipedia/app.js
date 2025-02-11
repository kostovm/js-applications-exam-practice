import page from './node_modules/page/page.mjs'
import { catalogView } from './views/catalogView.js'
import { addFruitView } from './views/addFruitView.js'
import { loginView } from './views/loginView.js'
import { logOutView } from './views/logOutView.js'
import { registerView } from './views/registerView.js'
import { editView } from './views/editView.js'
import { detailsView } from './views/detailsView.js'
import {searchView} from './views/searchView.js'
import { homePageView } from './views/homePageView.js'

export function updateNav(){
    const userNav = document.querySelector('body .user');
    const guestNav = document.querySelector('body .guest');

    if (sessionStorage.getItem('userData') == null){
        userNav.style.display = "none";
        guestNav.style.display = "inline";
    }else{
        userNav.style.display = "inline";
        guestNav.style.display = "none";
    }
}

updateNav();
document.getElementById('logoutBtn').addEventListener('click', logOutView);

page('/', homePageView);
page('/index.html', homePageView)
page('/fruitCatalog', catalogView)
page('/addFruit', addFruitView);
page('/login', loginView);
page ('/register', registerView);
page('/edit/:id', editView);
page('/details/:id', detailsView);
page('/search', searchView)
page.start();