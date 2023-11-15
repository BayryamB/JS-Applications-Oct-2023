import { html, render } from "./node_modules/lit-html/lit-html.js";

function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   const url = 'http://localhost:3030/jsonstore/advanced/table';
   const inputRef = document.querySelector('#searchField');

   async function loadData() {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
   }
   loadData();

   function onClick() {
      inputValue = inputRef.value;


   }
}
solve();