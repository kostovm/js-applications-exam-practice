import { post } from "../api.js"
import page from '../node_modules/page/page.mjs'

export async function likeIt(e){

let data = {
    factId: e.target.dataset.id
}
    post('/data/likes', data);
    page.redirect(`/details/${e.target.dataset.id}`)
}