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
    const currentUserCommentDiv = document.createElement('div');
    currentUserCommentDiv.classList.add('answer-comment');
    currentUserCommentDiv.innerHTML = `
    <p><span>currentUser</span> comment:</p>
    <div class="answer">
        <form>
            <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
            <div>
                <label for="username">Username <span class="red">*</span></label>
                <input type="text" name="username" id="username">
            </div>
            <button>Post</button>
        </form>
    </div>
    ` ;
    const postButton = currentUserCommentDiv.querySelector('button');
    const commentInfo = currentUserCommentDiv.querySelector('#comment');
    const usernameInput = currentUserCommentDiv.querySelector('#username');
    postButton.addEventListener('click', (e) => {
        e.preventDefault();
        addComments(commentInfo, usernameInput);
        commentInfo.value = '';
        usernameInput.value = '';

    });
    main.appendChild(currentUserCommentDiv);
    async function loadComments (){
        let comment = await fetch(commentsURI);
        let data = await comment.json();
        for (const comment in data) {
            let commentId = data[comment].postId;
            let commentInfo = data[comment].comment;
            let username = data[comment].username;
            let date = data[comment].date;
            let postDate = new Date(date);
            let year =  postDate.getFullYear();
            let month = String(postDate.getMonth() + 1).padStart(2, '0'); 
            let day = String(postDate.getDate()).padStart(2, '0');
            let hour = String(postDate.getHours()).padStart(2, '0');
            let minute = String(postDate.getMinutes()).padStart(2, '0');
            let second = String(postDate.getSeconds()).padStart(2, '0');
            let amOrPm = hour >= 12 ? 'PM' : 'AM';
            let formattedDate = `${year}/${month}/${day}, ${hour}:${minute}:${second} ${amOrPm}`;
            const divComment = document.querySelector('.comment');
            if(commentId === postId){
                divComment.innerHTML += `
            <div id="user-comment">
                <div class="topic-name-wrapper">
                    <div class="topic-name">
                    <p><strong>${username}</strong> commented on <time>${formattedDate}</time></p>
                        <div class="post-content">
                        <p>${commentInfo}</p>
                        </div>
                    </div>
                </div>
            </div>`
            }

        }
    }
    loadComments();
    async function addComments(comment, username) {
        let commentDate = new Date();
        const response = await fetch(commentsURI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "comment": comment.value,
                "username": username.value,
                "date": commentDate,
                "postId": postId,
            })
        })
    }
}
/*
*/
/*
<div class="comment">
    <div class="header">
        <img src="./static/profile.png" alt="avatar">
        <p><span>David</span> posted on <time>2020-10-10 12:08:28</time></p>

        <p class="post-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure facere sint
            dolorem quam,
            accusantium ipsa veniam laudantium inventore aut, tenetur quibusdam doloribus. Incidunt odio
            nostrum facilis ipsum dolorem deserunt illum?</p>
    </div>


    <div id="user-comment">
        <div class="topic-name-wrapper">
            <div class="topic-name">
                <p><strong>Daniel</strong> commented on <time>3/15/2021, 12:39:02 AM</time></p>
                <div class="post-content">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure facere sint
                        dolorem quam.</p>
                </div>
            </div>
        </div>
    </div>
</div>
*/