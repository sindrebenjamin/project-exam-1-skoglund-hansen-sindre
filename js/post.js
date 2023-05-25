const postId = new URLSearchParams(window.location.search).get("id");
const title = document.querySelector("title");
const article = document.querySelector("article");
const commentSection = document.querySelector(".comment-section");


async function fetchData() {

    try {

        const response = await fetch(`https://sindre.codes/bingo/wp-json/wp/v2/posts/${postId}?_embed`);
        const result = await response.json();

        if (response.ok) {
            
            printData(result);

        }

    } catch {
        
        article.innerHTML = `An error occured`;

    }


   
}

fetchData();

function printData(data) {

    title.innerHTML = `MixPath | ` + data.title.rendered;


    //Category

    const blogCategory = document.createElement("p");
    blogCategory.classList.add("blog-category", "border-radius");
    blogCategory.innerHTML = data._embedded['wp:term'][0][0].name;



    //Title

    const blogTitle = document.createElement("h1");
    blogTitle.classList.add("blog-title");
    blogTitle.innerHTML = data.title.rendered;
   


   //Content

    const blogContent = document.createElement("div");
    blogContent.innerHTML = data.content.rendered;
   

    //Author
    const authorBlock = document.createElement("div");
    authorBlock.classList.add("author-block");
    authorBlock.innerHTML = `<img src=${data._embedded.author[0].avatar_urls[48]} alt="avatar" class="author-avatar"> <p class="author-name">${data._embedded.author[0].name}</p>
    ${data._embedded.author[0].description} `;


    article.appendChild(blogCategory);
    article.appendChild(blogTitle);
    article.appendChild(blogContent);
    article.appendChild(authorBlock);



    //Modal


    const images = document.querySelectorAll("img");
    const modal = document.querySelector(".modal");
    const modalImage = document.querySelector(".modal-image");

    images.forEach((img) => {
        img.onclick = function() {
           modal.classList.remove("hidden");
           modalImage.src = img.src;
           modalImage.alt = img.alt;
        }
    });

    modal.onclick = function() {
        modal.classList.add("hidden");
    }
    
    
    
}


async function fetchComments() {

    try {

        const response = await fetch(`https://sindre.codes/bingo/wp-json/wp/v2/comments?post=${postId}`)
        const result = await response.json();

        if (response.ok) {

            printComments(result);

        }
        

    } catch {

        commentSection.innerHTML = `Error: Could not load comments`;

    }
    
        

}

fetchComments()


function printComments(comments) {

commentSection.innerHTML = ``;

const commentNumber = document.querySelector(".comment-number");

commentNumber.innerHTML = comments.length + ` `;


    for (let i = 0; i < comments.length; i++) {
        
        const dateString = comments[i].date;
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);


        const comment = document.createElement("div");
        comment.classList.add("comment");
        comment.innerHTML = `<div class="comment-wrapper">
        <div class="comment-info">
            <img src=${comments[i].author_avatar_urls[48]} alt="avatar" class="comment-avatar">
            <p class="comment-author">${comments[i].author_name}</p>
            <p class="comment-date">${formattedDate}</p>
        </div>
        <div class="comment-content">
            <p>${comments[i].content.rendered}</p>
        </div>
    </div>
        `
        commentSection.appendChild(comment);
    }
}


const commentForm = document.querySelector("#comment-form");

commentForm.addEventListener(`submit`, async (event) => { 

    event.preventDefault();

    const name = document.querySelector("#comment-author").value;
    const email = document.querySelector("#comment-email").value;
    const comment = document.querySelector("#comment-content").value;

    const data = {
        author_name: name,
        author_email: email,
        content: comment,
        post: postId
    }
    
    
    const catchErrorComments = document.querySelector("#catch-error-comments");
    
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NpbmRyZS5jb2Rlcy9iaW5nbyIsImlhdCI6MTY4NTAxMzk2NiwibmJmIjoxNjg1MDEzOTY2LCJleHAiOjE2ODU2MTg3NjYsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.1qO2VQaKnmcXVJkWKJfWGoFMHbLFYWgvtRGW6cBrfUQ";

    try {
        
        const response = await fetch("https://sindre.codes/bingo/wp-json/wp/v2/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
    

        if (response.ok) {

            fetchComments();

        }

        

    } catch (error){

        catchErrorComments.style.display = "block";

    }

   

});






