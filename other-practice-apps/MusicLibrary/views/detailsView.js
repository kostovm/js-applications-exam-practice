import { render, html } from "../node_modules/lit-html/lit-html.js"
import { get } from "../api.js"
import { onClick } from "./deleteView.js";

const detailsTemplate = (album) => html `
  <section id="details">
    <div id="details-wrapper">
      <p id="details-title">Album Details</p>
      <div id="img-wrapper">
        <img src="${album.imageUrl && album.imageUrl.includes('http') ? album.imageUrl : `../${album.imageUrl}`}" alt="example1" />
      </div>
      <div id="info-wrapper">
        <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
        <p><strong>Album name:</strong><span id="details-album">${album.album}</span></p>
        <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
        <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
        <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
      </div>
      <div id="likes">Likes: <span id="likes-count">0</span></div>

      ${
        JSON.parse(sessionStorage.getItem('userData'))
          ? (album._ownerId !== JSON.parse(sessionStorage.getItem('userData')).id
              ? html`
                  <div id="action-buttons">
                    <a href="javascript:void(0)" id="like-btn" data-likes="0" data-id="${album._id}" @click="${likeIt}">Like</a>
                  </div>
                `
              : null)
          : null
      }
      ${
        JSON.parse(sessionStorage.getItem('userData')) &&
        album._ownerId === JSON.parse(sessionStorage.getItem('userData')).id
          ? html`
              <div id="action-buttons">
                <a href="/edit/${album._id}" id="edit-btn">Edit</a>
                <a href="javascript:void(0)" id="delete-btn" data-id="${album._id}" @click="${onClick}">Delete</a>
              </div>
            `
          : null
      }
    </div>
  </section>
`;

export async function detailsView(context){
    const album = await getDetails(context.params.id)
    //const likes = await get(`/data/likes?where=albumId%3D%22{${context.params.id}}%22&distinct=_ownerId&count`)
        render(detailsTemplate(album), document.querySelector('body main'));
}

async function getDetails(id){
    return await get(`/data/albums/${id}`)
}