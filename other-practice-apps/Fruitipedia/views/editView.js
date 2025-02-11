import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { put, get } from "../api.js";

const editTemplate = (data) => html `
<section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form class="edit-form" @submit="${onSubmit}">
              <input
                type="text"
                name="name"
                id="name"
                value="${data.name}"
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                value="${data.imageUrl}"
              />
              <textarea
                id="fruit-description"
                name="description"
                rows="10"
                cols="50"
              >${data.description}</textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                rows="10"
                cols="50"
              >${data.nutrition}</textarea>
              <button type="submit" id="${data._id}">post</button>
            </form>
          </div>
        </section>
`

export async function editView (context){
    const data = await get(`/data/fruits/${context.params.id}`);
    render(editTemplate(data), document.querySelector('body main'))
}

function onSubmit(event) {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let imageUrl = document.getElementById('Fruit-image').value;
    let description = document.getElementById('fruit-description').value;
    let nutrition = document.getElementById('fruit-nutrition').value;

    if (name == "" || imageUrl == "" || description =="" || nutrition ==""){
        alert ('All fields are required');
        throw new Error('All fields are required')
    }else{
        let data = {
            name: name,
            imageUrl: imageUrl,
            description: description,
            nutrition: nutrition
        }
            put(`/data/fruits/${document.querySelector('section#edit button').id}`, data);
            page.redirect(`/details/${document.querySelector('section#edit button').id}`);
        }
    }