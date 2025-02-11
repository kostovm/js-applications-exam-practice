import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { post } from "../api.js";

const createTemplate = () => html`
<section id="create">
          <div class="form">
            <h2>Add Event</h2>
            <form class="create-form" @submit="${onSubmit}">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image URL"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
              />

              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
            />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`

export async function createView() {
    render(createTemplate(), document.querySelector('body main'))
}

function onSubmit(event) {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let imageUrl = document.getElementById('event-image').value;
    let category = document.getElementById('event-category').value;
    let description = document.getElementById('event-description').value;
    let date = document.getElementById('date').value;
    
    if (name == "" || imageUrl == "" || category == "" 
    || description == "" || date == ""){
        alert ('All fields are required')
        throw new Error('All fields are required')
    }

    let data = {
        name: name,
        imageUrl: imageUrl,
        category: category,
        description, description,
        date: date
    }
        post('/data/events', data);
        page.redirect('/catalog');
    }
