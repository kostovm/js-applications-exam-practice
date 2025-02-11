import { post } from "../api.js"
import { detailsView } from "./detailsView.js";
import page from '../node_modules/page/page.mjs'

export async function likeIt(e){

let data = {
    eventId: e.target.dataset.id
}
    post('/data/going', data);
    page.redirect(`/details/${e.target.dataset.id}`)
}