import { render, html } from "../node_modules/lit-html/lit-html.js"
import { get } from "../api.js"
import { onClick } from "./deleteView.js";
import { likeIt } from "./likeView.js";

const detailsTemplate = (fact, likes, userLikesIt) => html `
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${fact.imageUrl && fact.imageUrl.includes('http') 
            ? fact.imageUrl : `../${fact.imageUrl}`}" alt="" />
            <p id="details-category">${fact.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">
                  ${fact.description}
                  </p>
                   <p id ="more-info">
                   ${fact.moreInfo}
                        </p>
              </div>

              <h3>Likes:<span id="likes">${likes}</span></h3>

               ${JSON.parse(sessionStorage.getItem('userData'))
               ? (fact._ownerId === JSON.parse(sessionStorage.getItem('userData')).id
                 ? html`
                 <div id="action-buttons">
            <a href="/edit/${fact._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" data-id="${fact._id}" @click="${onClick}">Delete</a>
                </div>
                 `
                 : null)
               : null}
               ${
                JSON.parse(sessionStorage.getItem('userData'))
                  ? (fact._ownerId !== JSON.parse(sessionStorage.getItem('userData')).id && !userLikesIt
                    ? html`
                    <div id="action-buttons">
                    <a href="javascript:void(0)" id="like-btn" data-id="${fact._id}" @click="${likeIt}">Like</a>
                    </div>
                    `
                    : null)
                  : null
              }
            </div>
        </div>
      </section>
`

export async function detailsView(context){
  const id = context.params.id
  let likes = await getLikes(id)
  let userLikesIt = await userInfo(id)
    const fact = await getDetails(id)
    render(detailsTemplate(fact, likes, userLikesIt), document.querySelector('body main'));
}

async function getDetails(id){
    return await get(`/data/facts/${id}`)

}

async function getLikes(id){
  return await get(`/data/likes?where=factId%3D%22${id}%22&distinct=_ownerId&count`)
}

async function userInfo(id){

  if (JSON.parse(sessionStorage.getItem('userData'))){
    let userId = JSON.parse(sessionStorage.getItem('userData')).id
    let likesCount = await get(`/data/likes?where=factId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    if (likesCount >0){
     return true
     }else return false
  }else return true  
}