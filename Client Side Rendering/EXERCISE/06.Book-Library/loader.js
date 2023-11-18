import { render, html } from "./node_modules/lit-html/lit-html.js";
export function loader(){
    return html`
        <button id="loadBooks">LOAD ALL BOOKS</button>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    `
   
}