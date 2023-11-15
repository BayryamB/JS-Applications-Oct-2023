import { html, render } from "./node_modules/lit-html/lit-html.js";

function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   const url = 'http://localhost:3030/jsonstore/advanced/table';
   const inputRef = document.querySelector('#searchField');
   const section = document.querySelector('tbody');

   async function loadData() {
      const response = await fetch(url);
      const data = await response.json();
      let arr = [];
      for (const obj in data) {
         arr.push(data[obj]);
      }
      const result = html`
      ${arr.map(x => createContent(x))}
      `;
      render(result, section);
   }
   loadData();

   function createContent(person) {
      let firstName = person.firstName;
      let lastName = person.lastName;
      let email = person.email;
      let course = person.course;
      return html`
      <tr>
          <td>${firstName}${lastName}</td>
          <td>${email}</td>
          <td>${course}</td>
      </tr>
      `;
   }

   function onClick() {
      inputValue = inputRef.value;


   }
}
solve();