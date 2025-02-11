import { del } from "../api.js";
import page from "../node_modules/page/page.mjs";

export function onClick(e){
    const confirmDeletion = confirm('Are you sure you want to delete?');
    if (confirmDeletion){
        del(`/data/shoes/${e.target.dataset.id}`);
        page.redirect('/catalog');
    }
}