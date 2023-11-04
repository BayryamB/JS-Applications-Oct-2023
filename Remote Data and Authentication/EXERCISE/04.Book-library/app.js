function main() {
    const loadBtn = document.getElementById('loadBooks');
    const tBodyList = document.querySelector('tbody');
    const form = document.querySelector('form');
    const [title, author] = form.querySelectorAll('input');
    const submitButton = form.querySelector('button');
    const baseUrl = `http://localhost:3030/jsonstore/collections/books`

    loadBtn.addEventListener('click', loadBooks());
    async function loadBooks(){
        tBodyList.innerHTML = ``;
        try {
            const response = await fetch(baseUrl);
            const data = await response.json();
            for (const book in data) {
                let author = data[book].author;
                let title = data[book].title;
                let tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${title}</td>
                <td>${author}</td>
                <td>
                <button>Edit</button>
                <button>Delete</button>
                </td>`
                tBodyList.appendChild(tr);
            }
            
        } catch (error) {
            throw new Error(`Error fetching data`)
        }
    }
}

main();