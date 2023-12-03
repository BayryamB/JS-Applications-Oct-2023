function loadRepos() {
	const userName = document.getElementById('username');
	const userRepos = document.getElementById('repos');
	fetch(`https://api.github.com/users/${userName.value}/repos`,{
			method: 'GET',
        	}	
		)
		.then(res => res.json())
		.then(data => {
			userRepos.innerHTML = '';
			userName.value = '';

			data.forEach(element => {
			let li = document.createElement('li');
			li.innerHTML = `<li><a href="${element.html_url}">${element.full_name}</a></li>`;
			userRepos.appendChild(li);
		});
	})
		.catch (err => console.log(err))

}