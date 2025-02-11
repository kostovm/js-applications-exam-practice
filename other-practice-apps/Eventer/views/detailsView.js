import { render, html } from "../node_modules/lit-html/lit-html.js"
import { get } from "../api.js"
import { onClick } from "./deleteView.js";
import { likeIt } from "./likeView.js";

const furnitureTemplate = (evnt, likes, userLikesIt) => html `
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src="${evnt.imageUrl && evnt.imageUrl.includes('http') 
  ? evnt.imageUrl : `../${evnt.imageUrl}`}" alt="${evnt.name}" />
  <p id="details-title">${evnt.name}</p>
  <p id="details-category">
    Category: <span id="categories">${evnt.category}</span>
  </p>
  <p id="details-date">
    Date:<span id="date">${evnt.date}</span></p>
  <div id="info-wrapper">
    <div id="details-description">
      <span>
      ${evnt.description}
        </span>
    </div>

  </div>

  <h3>Going: <span id="go">${likes}</span> times.</h3>

  <!--Edit and Delete are only for creator-->

  <!-- Edit and Delete are only for creator -->
  ${JSON.parse(sessionStorage.getItem('userData'))
    ? (evnt._ownerId === JSON.parse(sessionStorage.getItem('userData')).id
      ? html`
      <div id="action-buttons">
      <a href="/edit/${evnt._id}" id="edit-btn">Edit</a>
      <a href="javascript:void(0)" id="delete-btn" data-id="${evnt._id}" @click="${onClick}">Delete</a>
      </div>
      `
      : null)
    : null}

  <!-- Bonus - Only for logged-in users (not authors) and when userLikesIt is false -->
  ${
    JSON.parse(sessionStorage.getItem('userData'))
      ? (evnt._ownerId !== JSON.parse(sessionStorage.getItem('userData')).id && !userLikesIt
        ? html`
        <div id="action-buttons">
        <a href="javascript:void(0)" id="go-btn" data-id="${evnt._id}" @click="${likeIt}">Going</a>
        </div>
        `
        : null)
      : null
  }
</div>
</section>
`

export async function detailsView(context){
  const id = context.params.id
  let likes = await getLikes(id)
  let userLikesIt = await userInfo(id)
    const evnt = await getDetails(id)
    render(furnitureTemplate(evnt, likes, userLikesIt), document.querySelector('body main'));
}

async function getDetails(id){
    return await get(`/data/events/${id}`)

}

async function getLikes(id){
  return await get(`/data/going?where=eventId%3D%22${id}%22&distinct=_ownerId&count`)
}

async function userInfo(id){

  if (JSON.parse(sessionStorage.getItem('userData'))){
    let userId = JSON.parse(sessionStorage.getItem('userData')).id
    let likesCount = await get(`/data/going?where=eventId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    if (likesCount >0){
     return true
     }else return false
  }else return true  
}
 