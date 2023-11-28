import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { post } from "../services/requester.js";
const url = '/data/catalog';

function createTemlate(){
    return html`
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control" id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control" id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control" id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material">
                    </div>
                    <input type="submit"  @click=${onCreate} class="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>
    `
}

async function onCreate(e){
    e.preventDefault();
    const make = document.getElementById('new-make');
    const model = document.getElementById('new-model');
    const year = document.getElementById('new-year');
    const description = document.getElementById('new-description');
    const price = document.getElementById('new-price');
    const img = document.getElementById('new-image');
    const material = document.getElementById('new-material');

    
    if(make.value.length < 4){
        make.classList.remove('is-valid');
        make.classList.add('is-invalid');
        return;
    }else{
        make.classList.remove('is-invalid');
        make.classList.add('is-valid');
    }
    if(model.value.length < 4){
        model.classList.remove('is-valid');
        model.classList.add('is-invalid');
        return;
    }else{
        model.classList.remove('is-invalid');
        model.classList.add('is-valid');
    }
    if(year.value < 1950 || year.value > 2050 || year.value === 'NaN' || year.value === ''){
        year.classList.remove('is-valid');
        year.classList.add('is-invalid');
        return;
    }else{
        year.classList.remove('is-invalid');
        year.classList.add('is-valid');
    }
    if(price.value <= 0){
        price.classList.remove('is-valid');
        price.classList.add('is-invalid');
        return;
    }else{
        price.classList.remove('is-invalid');
        price.classList.add('is-valid');
    }
    if(img.value.length < 4){
        img.classList.remove('is-valid');
        img.classList.add('is-invalid');
        return;
    }else{
        img.classList.remove('is-invalid'); 
        img.classList.add('is-valid');
    }
    if(description.value.length < 10){
        description.classList.remove('is-valid');
        description.classList.add('is-invalid');
        return;
    }else{
        description.classList.remove('is-invalid'); 
        description.classList.add('is-valid');
    }
    if(!make.value || !model.value || !year.value || !description.value || !price.value || !img.value){
        return alert('All fields are required');
    }
    const data = {
        make: make.value,
        model: model.value,
        year: year.value,
        description: description.value,
        price: price.value,
        img: img.value,
        material: material.value
    }
    try {
        const response = await post(url, data);
        page.redirect('/');
    } catch (error) {
        return alert(error.message);
    }
}
export function create(){
    return render(createTemlate(), document.querySelector('.container'));
}