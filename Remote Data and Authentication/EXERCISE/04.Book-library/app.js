function main() {
    const loadBtn = document.getElementById('loadBooks');
    const tBodyList = document.querySelector('tbody');
    const form = document.querySelector('form');
    const [titleRef, authorRef] = form.querySelectorAll('input');
    const submitButton = form.querySelector('button');
    let methodPutOrPost = `post`;
    let bufferAdress = ``;
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (methodPutOrPost === 'post') {
            addBook(methodPutOrPost, baseUrl);
        } else if (methodPutOrPost === 'put') {
            addBook(methodPutOrPost, bufferAdress);
        }
        methodPutOrPost = 'post';
    });
    const baseUrl = `http://localhost:3030/jsonstore/collections/books/`

    loadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loadBooks();
    });
    async function loadBooks() {
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
                console.log(book);
                const [editBtn, deleteBtn] = tr.querySelectorAll('button');
                editBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    titleRef.value = data[book].title;
                    authorRef.value = data[book].author;
                    methodPutOrPost = `put`;
                    bufferAdress = baseUrl + book;
                });
            }

        } catch (error) {
            throw new Error(`Error fetching data`)
        }
    }

    async function addBook(method, url) {
        try {
            if (!titleRef.value || !authorRef.value) {
                throw new Error('Please fill all fields');
            } else {
                if (method === `post`) {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "author": authorRef.value,
                            "title": titleRef.value
                        })
                    });
                } else if (method === `put`) {
                    const response = await fetch(url, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "author": authorRef.value,
                            "title": titleRef.value
                        })

                    })
                }

            }
            titleRef.value = '';
            authorRef.value = '';
            loadBooks();
        } catch (error) {
            throw new Error(`Error add tittle and author`);
        }
    }

}

main();