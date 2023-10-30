function loadCommits() {
    const userNameRef = document.getElementById('username');
    const userRepoRef = document.getElementById('repo');
    const commitsRef = document.getElementById('commits');
    commitsRef.innerHTML = ``;
    let url = `https://api.github.com/repos/${userNameRef.value}/${userRepoRef.value}/commits`;
    fetch(url,{
        method: 'GET'
    })
    .then(res => res.json())
    .then(data => data.forEach(element => {
        let name = element.commit.author.name;
        let commitMsg = element.commit.message;
        let content = `${name}: ${commitMsg}`;
        let li = document.createElement('li');
        li.innerHTML = content;
        commitsRef.appendChild(li);
    }))
    .catch(err => console.error(err))
    userNameRef.value = ``;
    userRepoRef.value = ``;
}