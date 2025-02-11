import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { post } from "../api.js";

const createTemplate = () => html`
<section id="create">
<div class="form">
  <h2>Add item</h2>
  <form class="create-form" @submit="${onSubmit}">
    <input
      type="text"
      name="brand"
      id="shoe-brand"
      placeholder="Brand"
    />
    <input
      type="text"
      name="model"
      id="shoe-model"
      placeholder="Model"
    />
    <input
      type="text"
      name="imageUrl"
      id="shoe-img"
      placeholder="Image url"
    />
    <input
      type="text"
      name="release"
      id="shoe-release"
      placeholder="Release date"
    />
    <input
      type="text"
      name="designer"
      id="shoe-designer"
      placeholder="Designer"
    />
    <input
      type="text"
      name="value"
      id="shoe-value"
      placeholder="Value"
    />

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
    let brand = document.getElementById('shoe-brand').value;
    let model = document.getElementById('shoe-model').value;
    let imageUrl = document.getElementById('shoe-img').value;
    let release = document.getElementById('shoe-release').value;
    let designer = document.getElementById('shoe-designer').value;
    let value = document.getElementById('shoe-value').value;

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
        post('/data/shoes', data);
        page.redirect('/catalog');

    }

}