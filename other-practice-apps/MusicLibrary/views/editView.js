import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { put, get } from "../api.js";

const editTemplate = (data) => html `
<section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form class="edit-form" @submit="${onSubmit}" id="${data._id}">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" value="${data.singer}"/>
            <input type="text" name="album" id="album-album" placeholder="Album" value="${data.album}"/>
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value="${data.imageUrl}"/>
            <input type="text" name="release" id="album-release" placeholder="Release date" value="${data.release}"/>
            <input type="text" name="label" id="album-label" placeholder="Label" value="${data.label}"/>
            <input type="text" name="sales" id="album-sales" placeholder="Sales" value="${data.sales}"/>

            <button type="submit">post</button>
          </form>
        </div>
      </section>
`

export async function editView(context){
    const data = await get(`/data/albums/${context.params.id}`);
    render(editTemplate(data), document.querySelector('body main'))
}

function onSubmit(event){
    event.preventDefault();

    let singer = document.getElementById('album-singer').value;
    let album = document.getElementById('album-album').value;
    let imageUrl = document.getElementById('album-img').value;
    let release = document.getElementById('album-release').value;
    let label = document.getElementById('album-label').value;
    let sales = document.getElementById('album-sales').value;
    let id = document.querySelector('form').id;


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
        sales: sales,
        id: id
    }
        put(`/data/albums/${id}`, data);
        page.redirect(`/details/${id}`);
}