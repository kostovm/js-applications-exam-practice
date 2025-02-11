import { render, html } from "../node_modules/lit-html/lit-html.js"
import { get } from "../api.js"

const catalogTemplate = (data) => html`
<h2>Fun Facts</h2>
        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
            ${data.map(
                (fact) => html`
                <div class="fact">
            <img src="${fact.imageUrl}" alt="" />
            <h3 class="category">${fact.category}</h3>
            <p class="description">${fact.description}</p>
            <a class="details-btn" href="/details/${fact._id}">More Info</a>
          </div>
                `
            )}
        </section>
`

const noDataTemplate = () => html`
<h2>No Fun Facts yet.</h2>
`

export async function catalogView() {
    const data = await get('/data/facts?sortBy=_createdOn%20desc');

    if (!data || data.length < 1 || data === null) {
        render(noDataTemplate(), document.querySelector('body main'))
    } else {
        render(catalogTemplate(data), document.querySelector('body main'));
    }
}