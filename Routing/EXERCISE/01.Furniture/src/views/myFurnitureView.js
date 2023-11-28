import { html , render} from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";
import { userService } from "../services/userService.js";

function myView(data){
    return html`
    <div class="row space-top">
            <div class="col-md-12">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
            </div>
        </div>
        <div class="row space-top">
            ${data.map(x => productTemplate(x))}
        </div>
    `
}
function productTemplate(item){
    return html `
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src="${item.img}" />
                            <p>${item.description}</p>
                            <footer>
                                <p>Price: <span>${item.price} $</span></p>
                            </footer>
                            <div>
                                <a href="/details/${item._id}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>
    `
}

export async function myFurnitureView(){
    const userId = userService.getUserId();
    const response = await fetch(`http://localhost:3030/data/catalog?where=_ownerId%3D%22${userId}%22`);
    const data = await response.json();
    return render(myView(data), document.querySelector('.container'));
}