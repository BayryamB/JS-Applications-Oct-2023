function attachEvents() {
    //capture elements
    const btnLoadPosts = document.getElementById("btnLoadPosts");
    const btnViewPost = document.getElementById("btnViewPost");
    const selection = document.getElementById("posts");
    const pTitleEl = document.getElementById("post-title");
    const pBodyEl = document.getElementById("post-body");
    const commentsUL = document.getElementById("post-comments");
  
    // define the variables
    let postsObj
    let postIDs
    let postTitles
    const baseURL = 'http://localhost:3030/jsonstore/blog/';
  
    //attach event handlers to the buttons
    btnLoadPosts.addEventListener("click", loadPosts);
    btnViewPost.addEventListener("click", showPost);
  
    // fetch request handler
    const fetchReq = (r) => {
      if (r.status !== 200) {
        throw new Error(`Server error: ${r.status}`);
      }
      return r;
    };
  
    async function loadPosts(e) {
  
      try {
        const URL = `${baseURL}posts`
        const response = await fetch(URL, { method: "GET" });
        const fetchResult = fetchReq(response);
        postsObj = await fetchResult.json();
  
        //extract the IDs and Titles
        postTitles = Object.keys(postsObj).reduce((acc, key) => {
          acc[key] = postsObj[key].title;
          return acc;
        }, {});;
  
        // add the option to the selection list
        for (const title in postTitles) {
          const option = document.createElement('option');
          option.textContent = postTitles[title].toUpperCase();
          option.id = title;
  
          selection.appendChild(option);
        }
      }
      catch (err) {
        throw new Error(`Fetch Error: ${err}`);
      }
    }
  
    async function showPost(e) {
      // clean previous inputs
      pTitleEl.textContent = '';
      pBodyEl.textContent = '';
      commentsUL.innerHTML = '';
  
      // get the selected post title, postBody & postId
      const postId = selection.selectedOptions[0].id;
      const postTitle = postsObj[postId].title;
      const postBody = postsObj[postId].body;
  
      try {
        const URL = `${baseURL}comments`
        const response = await fetch(URL, { method: "GET" });
        const fetchResult = fetchReq(response);
        const commentsObj = await fetchResult.json();
  
        const commentsArr = Object.entries(commentsObj); // array of arrays index[0] is the id index[1] is the objects
        const filtered = commentsArr.filter(([, obj]) => obj.postId === postId); // array of arrays index[0] is the id index[1] is the objects
  
        pTitleEl.textContent = postTitle;
        pBodyEl.textContent = postBody;
  
        filtered.forEach(element => {
          const li = document.createElement('li');
          li.id = element[1].id;
          li.textContent = element[1].text;
  
          commentsUL.appendChild(li);
        });
  
      }
      catch (err) {
        throw new Error(`Fetch Error: ${err}`);
      }
    }
  }
  attachEvents();