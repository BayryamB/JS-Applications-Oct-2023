const topicContainer = document.querySelector('div.topic-container');
const newPostDiv = document.querySelector('.new-topic-border');
const postURI = `http://localhost:3030/jsonstore/collections/myboard/posts`;
import {loadDetails} from './loadDetails.js';
export function loadHomePage() {
    newPostDiv.innerHTML = `
    <div class="header-background">
        <span>New Topic</span>
        </div>
        <form>
            <div class="new-topic-title">
                <label for="topicName">Title <span class="red">*</span></label>
                <input type="text" name="topicName" id="topicName">
            </div>
            <div class="new-topic-title">
                <label for="username">Username <span class="red">*</span></label>
                <input type="text" name="username" id="username">
            </div>
            <div class="new-topic-content">
                <label for="postText">Post <span class="red">*</span></label>
                <textarea type="text" name="postText" id="postText" rows="8" class="height"></textarea>
            </div>
            <div class="new-topic-buttons">
                <button class="cancel">Cancel</button>
                <button class="public">Post</button>
            </div>

        </form>`;


    async function loadTopics(){
        try {
            const request = await fetch(postURI)
        const data = await request.json();
        for (const post in data) {
            let topicName = data[post].topicName;
            let username = data[post].username;
            let postText = data[post].postText;
            let date = data[post].date;
            let postId = data[post]._id;
            const div = document.createElement('div');
            div.classList.add('topic-name-wrapper');
            div.innerHTML = `
            <div class="topic-name">
                <a href="#" class="normal">
                    <h2>${topicName}</h2>
                </a>
                <div class="columns">
                    <div>
                        <p>Date: <time>${date}</time></p>
                        <div class="nick-name">
                            <p>Username: <span>${username}</span></p>
                        </div>
                    </div>


                </div>
            </div>`
            topicContainer.appendChild(div);
            const titleAnchor = div.querySelector('.normal');
            titleAnchor.addEventListener('click', (e) => {
                e.preventDefault();
                loadDetails(topicName, username, postText, date, postId);
            })
            
        }
        } catch (error) {
            throw new Error('Error while loading topics')
        }
    }
    loadTopics();
    const cancelButton = document.querySelector('.cancel');
    const postButton = document.querySelector('.public');
    cancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        clearInputs();
    });
    postButton.addEventListener('click', (e) => {
        e.preventDefault();
        publishContent()
        clearInputs();
    });
    async function publishContent() {
        const topicName = document.querySelector('#topicName').value;
        const username = document.querySelector('#username').value;
        const postText = document.querySelector('#postText').value;
        if(!topicName || !username || !postText){
            throw new Error('Please fill the information');
        }
        let date = new Date();
        date.setUTCHours(date.getUTCHours() + 2);
        const response = await fetch(postURI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "topicName": topicName,
                "username": username,
                "postText": postText,
                "date": date,
            })
        })
        clearInputs();
        loadTopics()
    }
    function clearInputs() {
        document.querySelector('#topicName').value = '';
        document.querySelector('#username').value = '';
        document.querySelector('#postText').value = '';
    }
}