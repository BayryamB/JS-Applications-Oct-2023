import { towns} from './towns.js';
import { html, render } from './node_modules/lit-html/lit-html.js';
function search() {
   const townsDiv = document.getElementById('towns');
   const searchBtn = document.querySelector('button');
   const counter = document.querySelector('#result');
   let count = 0;
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

   searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      count = 0;
      const searchedText = document.getElementById('searchText').value;
      const items = Array.from(townsDiv.querySelectorAll('li'));
      items.forEach((item) => matchCheck(item , searchedText));
   });
   function matchCheck(item, searchText) {
      let townName = item.textContent;
      if(townName.includes(searchText)){
         item.classList.add('active');
         count ++;
      }else{
         item.classList.remove('active');
      }
      counter.textContent = `${count} matches found`;
   }
   
}
search();