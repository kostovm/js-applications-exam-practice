import { render, html } from "../node_modules/lit-html/lit-html.js"
import { get } from "../api.js"
import { onClick } from "./deleteView.js";

const furnitureTemplate = (shoe) => html`
<section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src="${shoe.imageUrl && shoe.imageUrl.includes('http')
        ? shoe.imageUrl : `../${shoe.imageUrl}`}" alt="${shoe.brand}" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
              <p>
                Model: <span id="details-model">${shoe.model}</span>
              </p>
              <p>Release date: <span id="details-release">${shoe.release}</span></p>
              <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
              <p>Value: <span id="details-value">${shoe.value}</span></p>
            </div>
            ${JSON.parse(sessionStorage.getItem('userData'))
              ? (shoe._ownerId === JSON.parse(sessionStorage.getItem('userData')).id
                ? html`
                  <div id="action-buttons">
                    <a href="/edit/${shoe._id}" id="edit-btn">Edit</a>
                    <a href="javascript:void(0)" id="delete-btn" data-id="${shoe._id}" @click="${onClick}">Delete</a>
                  </div>
                `
                : null)
              : null}
          </div>
        </section>
`

export async function detailsView(context) {
    const shoe = await getDetails(context.params.id)
    render(furnitureTemplate(shoe), document.querySelector('body main'));
    //document.querySelector('.btn-red').addEventListener('click', onClick)
}

async function getDetails(id) {
    return await get(`/data/shoes/${id}`)
}