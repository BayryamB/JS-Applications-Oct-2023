import { towns} from './towns.js';
import { html, render } from './node_modules/lit-html/lit-html.js';
function search() {
   const townsDiv = document.getElementById('towns');
   const searchBtn = document.querySelector('button');
   const counter = document.querySelector('#result');

   function createLi(x) {
      return html`
      <li>${x}</li>
      `
   }
   function createContent () {
      const content = html`
      <ul>
         ${towns.map(x => createLi(x))}
      </ul>`;
      render(content, townsDiv);
   }
   createContent();
}
search();