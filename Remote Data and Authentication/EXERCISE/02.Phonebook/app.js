function attachEvents() {
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');
    const inputPerson = document.getElementById('person');
    const inputPhone = document.getElementById('phone');
    const ulPhonebook = document.getElementById('phonebook');
    const phonebookUrl = `http://localhost:3030/jsonstore/phonebook`;

    loadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        load();
    });

    createBtn.addEventListener('click', (e) => {
        e.preventDefault();
        createContact();
    });
    
    async function load(){
        ulPhonebook.innerHTML = '';
        try {
            const res = await fetch(phonebookUrl);
            const data = await res.json();
            for (const person in data) {
                const name = data[person].person;
                const phone = data[person].phone;
                const id = data[person]._id;
                let li = document.createElement('li');
                let dButton = `<button>Delete</button>`;
                li.innerHTML = `${name}: ${phone}${dButton}`;
                ulPhonebook.appendChild(li);
                const deleteButton = li.querySelector('button');
                deleteButton.addEventListener('click', () => {
                    deleteContact(id);
                });
            }
        } catch (error) {
            throw new Error('Error')
        }
        
    }

    async function createContact() {
        try {
            const response = await fetch(phonebookUrl,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    person: inputPerson.value,
                    phone: inputPhone.value
                })
            })
        } catch (error) {
            throw new Error('Error');
        }
        inputPerson.value = '';
        inputPhone.value = '';
    }

    async function deleteContact(id) {
        try {
            const response = await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {
                method: 'DELETE'
            })
            const data = await response.json();
            
        } catch (error) {
            throw new Error('Error');
        }
        load();
    }
}

attachEvents();