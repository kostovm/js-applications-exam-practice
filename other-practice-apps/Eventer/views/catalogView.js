import { render, html } from "../node_modules/lit-html/lit-html.js"
import { get } from "../api.js"

const catalogTemplate = (data) => html `
<h2>Current Events</h2>
        <section id="dashboard">
        ${data.map(
            (evnt) => html`
            <div class="event">
            <img src="${evnt.imageUrl}" alt="${evnt.name}" />
            <p class="title">
            ${evnt.name}
            </p>
            <p class="date">${evnt.date}</p>
            <a class="details-btn" href="/details/${evnt._id}">Details</a>
          </div>
            `
        )}
        </section>
`



const noDataTemplate = () => html `
<h2>Current Events</h2>
<h4>No Events yet.</h4>
`

export async function catalogView(){
    const data = await get('/data/events?sortBy=_createdOn%20desc');

    if (!data || data.length < 1 || data === null){
        render(noDataTemplate(), document.querySelector('body main'));
    }else{
        render(catalogTemplate(data), document.querySelector('body main'));
    }
    
}