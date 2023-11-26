import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { get } from "../services/requester.js";
import { userService } from "../services/userService.js";

const url = '/data/fruits/';


function detailsView(fruit){
    let isOwner = false;
    function div(){
        const creatorId = userService.getUserId();
        const postId = fruit._ownerId;
        if(creatorId == postId){
            isOwner = true;
        }
    }
    return html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="./images/fruit 1.png" alt="example1" />
            <p id="details-title">Pineapple</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>
                  The pineapple is a tropical plant with an edible fruit.
                  It is the most economically significant plant in the family Bromeliaceae.The 
                  pineapple is indigenous to South America.
                  Pineapples grow as a small shrub, the individual flowers of the unpollinated plant
                   fuse to form a multiple fruit. The plant is normally propagated from the offset produced
                    at the top of the fruit,or from a side shoot, and typically matures within a year.
                  </p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">
                      Raw pineapple pulp is 86% water, 13% carbohydrates, 0.5% protein, and contains negligible fat (table).
                       In a 100-gram reference amount, raw pineapple supplies 209 kilojoules (50 kilocalories) of food energy,
                        and is a rich source of manganese (44% Daily Value, DV) and vitamin C (58% DV), but otherwise contains
                         no micronutrients in significant amounts.
                        </p>
              </div><!--Edit and Delete are only for creator-->
            ${isOwner ? html`
                <div id="action-buttons">
                <a href="" id="edit-btn">Edit</a>
                <a href="" id="delete-btn">Delete</a>
                </div>
            ` : ""}
            </div>
        </div>
      </section>
    `
}
export async function details(id){
    const productInfo = await getInfo(id);
    render(detailsView(productInfo), document.querySelector('main'));
}

async function getInfo(id){
    const data = await get(url + id);
    return data;
}