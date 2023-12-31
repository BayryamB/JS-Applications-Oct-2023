import { html, render } from "../../node_modules/lit-html/lit-html.js";
function homeTemplate(data, ctx){
    return html`
            <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
            ${data.map(x => productsTemplate(x, ctx))}
        </div>
    `;
}
export async function homeView(ctx){
    const response = await fetch('http://localhost:3030/data/catalog');
    const products = await response.json();
    render(homeTemplate(products, ctx), document.querySelector('.container'));
}

function productsTemplate(item, ctx) {
    ctx.params = item._id;
        return html`
        <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src="${item.img}" />
                            <p>${item.description}</p>
                            <footer>
                                <p>Price: <span>${item.price} $</span></p>
                            </footer>
                            <div>
                                <a href=details/${item._id} class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
        `
}
