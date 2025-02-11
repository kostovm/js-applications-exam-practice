import { render, html } from "../node_modules/lit-html/lit-html.js"
import { get } from "../api.js"

const catalogTemplate = (data) => html `
<section id="dashboard">
          <h2>Collectibles</h2>
          <ul class="card-wrapper">
          ${data.map(
            (shoes) => html`
            <li class="card">
              <img src="${shoes.imageUrl}" alt="${shoes.model}" />
              <p>
                <strong>Brand: </strong><span class="brand">${shoes.brand}</span>
              </p>
              <p>
                <strong>Model: </strong
                ><span class="model">${shoes.model}</span>
              </p>
              <p><strong>Value:</strong><span class="value">${shoes.value}</span>$</p>
              <a class="details-btn" href="/details/${shoes._id}">Details</a>
            </li>
            `
          )}
          </ul>

        </section>
`

const noDataTemplate = () => html`
<section id="dashboard">
          <h2>Collectibles</h2>
          <ul class="card-wrapper">
          <h2>There are no items added yet.</h2>
        </section>
`

export async function catalogView(){
    const data = await get('/data/shoes?sortBy=_createdOn%20desc');

    if (!data || data.length == 0){
        render(noDataTemplate(), document.querySelector('body main'));
    }else{
      render(catalogTemplate(data), document.querySelector('body main'));
    }
}