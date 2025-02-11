import { put } from "../api.js";
import page from "../node_modules/page/page.mjs";

export function likeIt(e){
    let likes = e.target.dataset.likes
    let data = likes++;
    put(`/data/likes/${e.target.dataset.id}`);
    page.redirect(`/details/${e.target.dataset.id}`);
}