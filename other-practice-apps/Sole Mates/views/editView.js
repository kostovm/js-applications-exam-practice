import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { put, get } from "../api.js";

const editTemplate = (data) => html`
<section id="edit">
          <div class="form">
            <h2>Edit item</h2>
            <form class="edit-form" @submit="${onSubmit}" id="${data._id}">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
                value="${data.brand}"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
                value="${data.model}"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
                value="${data.imageUrl}"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
                value="${data.release}"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
                value="${data.designer}"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
                value="${data.value}"
              />

              <button type="submit" >post</button>
            </form>
          </div>
        </section>
`

export async function editView(context){
    const data = await get(`/data/shoes/${context.params.id}`);
    render(editTemplate(data), document.querySelector('body main'))
}

function onSubmit(event) {
    event.preventDefault();
    let brand = document.getElementById('shoe-brand').value;
    let model = document.getElementById('shoe-model').value;
    let imageUrl = document.getElementById('shoe-img').value;
    let release = document.getElementById('shoe-release').value;
    let designer = document.getElementById('shoe-designer').value;
    let value = document.getElementById('shoe-value').value;
    let id = document.querySelector('form').id;

    if (brand == "" || model == "" || imageUrl == "" || release == "" || designer == "" || value == "") {
        alert('All fields are required');
        throw new Error('All fields are required')
    } else {
        let data = {
            brand: brand,
            model: model,
            imageUrl: imageUrl,
            release: release,
            designer: designer,
            value: value
        }
        put(`/data/shoes/${id}`, data);
        page.redirect(`/details/${id}`);

    }

}