import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { post } from "../api.js";

const createTemplate = () => html`
<section id="create">
<div class="form">
  <h2>Add Album</h2>
  <form class="create-form" @submit="${onSubmit}">
    <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
    <input type="text" name="album" id="album-album" placeholder="Album" />
    <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
    <input type="text" name="release" id="album-release" placeholder="Release date" />
    <input type="text" name="label" id="album-label" placeholder="Label" />
    <input type="text" name="sales" id="album-sales" placeholder="Sales" />

    <button type="submit">post</button>
  </form>
</div>
</section>
`

export async function createView() {
    render(createTemplate(), document.querySelector('body main'))
}

function onSubmit(event) {
    event.preventDefault();
    let singer = document.getElementById('album-singer').value;
    let album = document.getElementById('album-album').value;
    let imageUrl = document.getElementById('album-img').value;
    let release = document.getElementById('album-release').value;
    let label = document.getElementById('album-label').value;
    let sales = document.getElementById('album-sales').value;

    if (singer == "" || album == "" || imageUrl == "" 
    || release == "" || label == "" || sales == ""){
        alert ('All fields are required')
        throw new Error('All fields are required')
    }

    let data = {
        singer: singer,
        album: album,
        imageUrl: imageUrl,
        release: release,
        label: label,
        sales: sales
    }
        post('/data/albums', data);
        page.redirect('/catalog');
}

