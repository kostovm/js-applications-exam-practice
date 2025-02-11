import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { post } from "../api.js";

const createTemplate = () => html`
<section id="create">
          <div class="form">
            <h2>Add Fact</h2>
            <form class="create-form" @submit="${onSubmit}">
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Category"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fact</button>
            </form>
          </div>
        </section>
`

export async function createView() {
    render(createTemplate(), document.querySelector('body main'))
}

function onSubmit(event) {
    event.preventDefault();
    let category = document.getElementById('category').value;
    let imageUrl = document.getElementById('image-url').value;
    let description = document.getElementById('description').value;
    let moreInfo = document.getElementById('additional-info').value;

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
        post('/data/facts', data);
        page.redirect('/catalog');
    }

