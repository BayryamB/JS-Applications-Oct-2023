import { html, render } from "./node_modules/lit-html/lit-html.js";
function addItem() {
    const url = 'http://localhost:3030/jsonstore/advanced/dropdown'
    const selectRef = document.getElementById('menu');
    const inputText = document.querySelectorAll('input')[0];
    const addBtn = document.querySelectorAll('input')[1];
    addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addNewOpttion(inputText.value);
    })
    async function getItems(){
        const response = await fetch(url);
        const data = await response.json();
        let arr = Object.values(data);
        
        const buff = html`
        ${arr.map(obj => createOption(obj)
        )}
        `
        render(buff, selectRef);
    }
    getItems();
    function createOption(obj) {
        let value = obj._id;
        let text = obj.text;
        return html`
        <option value="${value}">${text}</option>
        `;
    }
    
    async function addNewOpttion (value){
        try {
            const response = await fetch (url, {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify ({
                    "text": value
                })
            });
            inputText.value = '';
            getItems();
        } catch (error) {
            throw new Error (error.message)
        }
    }

}
addItem();