import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { put, get } from "../api.js";

const editTemplate = (data) => html `
<section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form class="edit-form" @submit="${onSubmit}" id="${data._id}">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
                value="${data.name}"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image"
                value="${data.imageUrl}"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
                value="${data.category}"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              >${data.description}</textarea>
              
              <label for="date-and-time">Event Time:</label>
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
              value="${data.date}"
            />

              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`

export async function editView(context){
    const data = await get(`/data/events/${context.params.id}`);
    render(editTemplate(data), document.querySelector('body main'))
}

function onSubmit(event){
    event.preventDefault();

    let name = document.getElementById('name').value;
    let imageUrl = document.getElementById('event-image').value;
    let category = document.getElementById('event-category').value;
    let description = document.getElementById('event-description').value;
    let date = document.getElementById('date').value;
    let id = document.querySelector('.edit-form').id;
    
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
        date: date,
        id: id
    }
        put(`/data/events/${data.id}`, data);
        page.redirect(`/details/${data.id}`);
    }