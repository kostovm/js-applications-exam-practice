import { render, html } from "../node_modules/lit-html/lit-html.js"
import { get } from "../api.js"

const noFruitsTemplate = () => html `
<h2>No fruit info yet.</h2>
`

const catalogTemplate = (data) => html `
<h2>Fruits</h2>
        <section id="dashboard">
        ${data.map((fruit) => html`
        <div class="fruit">
            <img src="${fruit.imageUrl}" alt="${fruit.name}" />
            <h3 class="title">${fruit.name}</h3>
            <p class="description">${fruit.description}</p>
            <a class="details-btn" href="/details/${fruit._id}">More Info</a>
          </div>
        `)}
        </section>
`

export async function catalogView (){
    const data = await get('/data/fruits?sortBy=_createdOn%20desc');

    if (data){
        render(catalogTemplate(data), document.querySelector('body main'));
    }else{
        render(noFruitsTemplate(), document.querySelector('body main'));
    }
}