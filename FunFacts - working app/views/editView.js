import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { put, get } from "../api.js";

const editTemplate = (data) => html `
<section id="edit">
<div class="form">
  <h2>Edit Fact</h2>
  <form class="edit-form" @submit="${onSubmit}" id="${data._id}">
    <input
    type="text"
    name="category"
    id="category"
    placeholder="Category"
    value="${data.category}"
  />
  <input
    type="text"
    name="image-url"
    id="image-url"
    placeholder="Image URL"
    value="${data.imageUrl}"
  />
  <textarea
  id="description"
  name="description"
  placeholder="Description"
  rows="10"
  cols="50"
>${data.description}</textarea>
<textarea
  id="additional-info"
  name="additional-info"
  placeholder="Additional Info"
  rows="10"
  cols="50"
>${data.moreInfo}</textarea>
    <button type="submit">Post</button>
  </form>
</div>
</section>
`

export async function editView(context){
    const data = await get(`/data/facts/${context.params.id}`);
    render(editTemplate(data), document.querySelector('body main'))
}

function onSubmit(event){
    event.preventDefault();

    let category = document.getElementById('category').value;
    let imageUrl = document.getElementById('image-url').value;
    let description = document.getElementById('description').value;
    let moreInfo = document.getElementById('additional-info').value;
    let id = document.querySelector('form').id

    if (category == "" || imageUrl == "" || description == "" || moreInfo == ""){
        alert ('All fields are required')
          throw new Error('All fields are required')
      }

    let data = {
        category: category,
        imageUrl: imageUrl,
        description: description,
        moreInfo: moreInfo
    }
        put(`/data/facts/${id}`, data);
        page.redirect(`/details/${id}`);
    }