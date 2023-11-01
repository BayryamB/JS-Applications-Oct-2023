function solution() {
    const baseAddress = `http://localhost:3030/jsonstore/advanced/articles/list`;
    const articlesAdress = `http://localhost:3030/jsonstore/advanced/articles/details/`;
    const mainSection = document.getElementById('main');
    async function getArticles(baseAddress) {
        const response = await fetch(baseAddress);
        const data = await response.json();
        for (const obj of data) {
            let id = obj._id;
            const res = await fetch (articlesAdress + id)
            const article = await res.json();
            const title = article.title
            const content = article.content
            makeContent(id, title, content);
        }
    }
    function makeContent(id, title, content) {
        const div = document.createElement('div');
        div.className = 'accordion';
        div.innerHTML = `
            <div class="head">
                <span>${title}</span>
                <button class="button" id="${id}">More</button>
            </div>
            <div class="extra">
             <p>${content}</p>
            </div>`;
        mainSection.appendChild(div);
        let button = document.getElementById(id);
        button.addEventListener('click', (e) => {
            const extra = div.querySelector('.extra');
            if (e.target.textContent === 'More') {
                extra.style.display = 'block';
                e.target.textContent = 'Less';
            } else if (e.target.textContent === 'Less') {
                extra.style.display = 'none';
                e.target.textContent = 'More';
            }
        })
    }
    getArticles(baseAddress);

}
solution();