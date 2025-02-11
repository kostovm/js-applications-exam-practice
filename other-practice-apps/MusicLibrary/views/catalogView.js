import { render, html } from "../node_modules/lit-html/lit-html.js"
import { get } from "../api.js"

const catalogTemplate = (data) => html `
  <section id="dashboard">
    <h2>Albums</h2>
    ${data.length > 0
      ? html`
        <ul class="card-wrapper">
          ${data.map((album) => html`
            <li class="card">
              <img src="${album.imageUrl}" alt="${album.album}" />
              <p>
                <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
              </p>
              <p>
                <strong>Album name: </strong><span class="album">${album.album}</span>
              </p>
              <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
              <a class="details-btn" href="/details/${album._id}">Details</a>
            </li>
          `)}
        </ul>`
      : html`<h2>There are no albums added yet.</h2>`}
  </section>
`

export async function catalogView() {
  const data = await get('/data/albums?sortBy=_createdOn%20desc');

  if (!data || data.length === 0) {
    render(noDataTemplate(), document.querySelector('body main'));
  } else {
    render(catalogTemplate(data), document.querySelector('body main'));
  }
}