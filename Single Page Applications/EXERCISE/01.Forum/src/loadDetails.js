const commentsURI = `http://localhost:3030/jsonstore/collections/myboard/comments`;
const main = document.querySelector('main');
export function loadDetails(topicName, username, postText, date, postId){
    const div = document.createElement('div');
    let postDate = new Date(date);
    let year =  postDate.getFullYear();
    let month = String(postDate.getMonth() + 1).padStart(2, '0'); 
    let day = String(postDate.getDate()).padStart(2, '0');
    let hour = String(postDate.getHours()).padStart(2, '0');
    let minute = String(postDate.getMinutes()).padStart(2, '0');
    let second = String(postDate.getSeconds()).padStart(2, '0');
    let formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    div.classList.add('comment');
    div.innerHTML = `
    <div class="header">
        <img src="./static/profile.png" alt="avatar">
        <p><span>${username}</span> posted on <time>${formattedDate}</time></p>

        <p class="post-content">${postText}</p>
    </div>`;
    main.innerHTML = ``;
    main.appendChild(div);
}
