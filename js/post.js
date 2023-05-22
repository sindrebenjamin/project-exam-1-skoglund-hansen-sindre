



//key: ]K;(3}.2J)Ej~S2a|.J|W+|c7{9_h@xts>;S&v/0A~(+s+%mZy0_*Ee.YP]25XwV





const title = document.querySelector("title");
const article = document.querySelector("article");
const commentSection = document.querySelector(".comment-section");
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

async function fetchData() {

    const response = await fetch(`https://sindre.codes/bingo/wp-json/wp/v2/posts/${postId}?_embed`)
    const result = await response.json();
    console.log(result);
    printData(result)
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
    
        const response = await fetch(`https://sindre.codes/bingo/wp-json/wp/v2/comments?post=${postId}`)
        const result = await response.json();
        printComments(result)

}

fetchComments()


function printComments(comments) {
console.log(comments);

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

let generatedToken = "";

async function token() {

    const data = {
        username: "admin",
        password: "123456"
    }
    
    const response = await fetch("https://sindre.codes/bingo/wp-json/jwt-auth/v1/token", {
        method: "POST",
        headers: {"Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await response.json();
    console.log(result)
    generatedToken = result.token;
   
}

token();



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

    
    const token = generatedToken;
    const response = await fetch("https://sindre.codes/bingo/wp-json/wp/v2/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    const result = await response.json();
    console.log(result);

    commentForm.reset();
    fetchComments();

});






