function attachEvents() {
    const baseURI = `http://localhost:3030/jsonstore/messenger`;
    const messagesArea = document.getElementById('messages');
    const sendBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');
    const divInput = document.getElementById('controls');

    refreshBtn.addEventListener('click', (event) => {
        event.preventDefault();
        async function loadMessages(e) {
            const response = await fetch(baseURI);
            const data = await response.json();
            messagesArea.textContent = "";
            let msg = [];
            Object.values(data).forEach(element => {
                msg.push(`${element.author}: ${element.content}`);
            });
            messagesArea.textContent = msg.join('\n');
        }
        loadMessages();
    });
    sendBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const [name, messages] = divInput.querySelectorAll('input');
        const obj = {
            author: name.value,
            content: messages.value
        };
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        };
        fetch(baseURI, request)
            .then(res => res.json())
            .catch(err => console.log(err));
            name.value = "";
            messages.value = "";
    });

    
}

attachEvents();