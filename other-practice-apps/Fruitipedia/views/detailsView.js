import { render, html } from "../node_modules/lit-html/lit-html.js"
import { get } from "../api.js"
import { onClick } from "./deleteView.js";

const detailsTemplate = (fruit) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${fruit.imageUrl && fruit.imageUrl.includes('http') 
            ? fruit.imageUrl : `../${fruit.imageUrl}`}" alt="example1" />
            <p id="details-title">${fruit.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>
                  ${fruit.description}
                  </p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">
                      ${fruit.nutrition}
                        </p>
              </div>
              ${JSON.parse(sessionStorage.getItem('userData'))
              ? (fruit._ownerId === JSON.parse(sessionStorage.getItem('userData')).id
                ? html`
                  <div id="action-buttons">
                    <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
                    <a href="/fruitCatalog" id="delete-btn" data-id="${fruit._id}" @click="${onClick}">Delete</a>
                  </div>
                `
                : null)
              : null}
            </div>
        </div>
      </section>
`

export async function detailsView (context){
    const fruit = await getDetails(context.params.id)
    render(detailsTemplate(fruit), document.querySelector('body main'));
}

async function getDetails(id){
    return await get(`/data/fruits/${id}`)
}

