import { html, render } from "../node_modules/lit-html/lit-html.js"
import { get } from "../api.js";

const searchTemplate = () => html`
<section id="search">

        <div class="form">
          <h2>Search</h2>
          <form class="search-form" @submit="${onSubmit}">
            <input
              type="text"
              name="search"
              id="search-input"
            />
            <button class="button-list">Search</button>
          </form>
        </div>
        <h4>Results:</h4>
        <div class="search-result">
        
         </div>
                </section>
`

const result = (data) => html`
${data.map((fruit) => html`
<div class="fruit">
 <img src="${fruit.imageUrl && fruit.imageUrl.includes('http') 
 ? fruit.imageUrl : `../${fruit.imageUrl}`}" alt="${fruit.name}" />
 <h3 class="title">${fruit.name}</h3>
 <p class="description">${fruit.description}</p>
 <a class="details-btn" href="/details/${fruit._id}">More Info</a>
</div>
`)}
`

const noResult = () => html`
<p class="no-result">No result.</p>
`

export async function searchView (){
    render(searchTemplate(), document.querySelector('body main'));
    
}

async function onSubmit(event){
    event.preventDefault();
    const searchValue = document.getElementById('search-input').value;
    if (searchValue === ""){
        alert ("Search field is empty");
        throw new Error("Search field is empty")
    }
    let data = await get(`/data/fruits?where=name%20LIKE%20%22${searchValue}%22`);
    document.querySelector('form.search-form').reset();
    if (data.length === 0){
        render(noResult(), document.querySelector('section#search div.search-result'))
    }else{
        render(result(data), document.querySelector('section#search div.search-result'))
    }
}

// function renderSearchResult(){
// render(result(), document.querySelector('section#search div.search-result'))
// }

{/* <div class="search-result">
<p class="no-result">No result.</p>
 <!--If there are matches display a div with information about every fruit-->
<div class="fruit">
 <img src="./images/fruit 1.png" alt="example1" />
 <h3 class="title">Pineapple</h3>
 <p class="description">The pineapple is a tropical plant with an edible fruit.
   It is the most economically significant plant in the family Bromeliaceae.The 
   pineapple is indigenous to South America.
   Pineapples grow as a small shrub, the individual flowers of the unpollinated plant
    fuse to form a multiple fruit. The plant is normally propagated from the offset produced
     at the top of the fruit,or from a side shoot, and typically matures within a year.</p>
 <a class="details-btn" href="">More Info</a>
</div>
 </div> */}