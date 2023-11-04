function main() {
    const loadBtn = document.getElementById('loadBooks');
    const tBodyList = document.querySelector('tbody');
    const form = document.querySelector('form');
    const [title, author] = form.querySelectorAll('input');
    const submitButton = form.querySelector('button');
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        addBook();
    });
    const baseUrl = `http://localhost:3030/jsonstore/collections/books/`

    loadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loadBooks();
    });
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
                const [editBtn, deleteBtn] = tr.querySelectorAll('button');
                editBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    editBook(book, data);
                });
            }
            
        } catch (error) {
            throw new Error(`Error fetching data`)
        }
        
    }

    async function addBook(){
        try {
            if(!title.value || !author.value){
                throw new Error('Please fill all fields');
            }else{
                const response = await fetch(baseUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "author": author.value,
                        "title": title.value
                    })
                });

            }
            title.value = '';
            author.value = '';

            loadBooks();
        } catch (error) {
            throw new Error(`Error add tittle and author`);
        }
    }
    
    async function editBook(book, data) {
        title.value  = data[book].title;
        author.value = data[book].author;
        try {
            const response = await fetch(baseUrl + book, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "author": author.value,
                    "title": title.value
                })
                   
            })
        } catch (error) {
            
        }
    }
}

main();