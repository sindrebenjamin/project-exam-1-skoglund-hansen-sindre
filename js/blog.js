// Blog

const categories = new URLSearchParams(window.location.search).get('categories');
const loadMore = document.querySelector(".load-more");


const blogContainer = document.querySelector(".blog-card-container");
let page = 1;
let postNumber = 0;
let postArray = [];

async function fetchData() {
    try {
   
            const response = await fetch(`https://sindre.codes/bingo/wp-json/wp/v2/posts?_embed&per_page=20`);
            const result = await response.json();
            postArray.push(...result);
            printData(postArray)
            
    }
    
    catch(error) {
        blogContainer.innerHTML = "An error occured";
        console.log(error);
    }

   

    
}

loadMore.onclick = function() {
        page++;
        postNumber += 10;
        printData(postArray);

        if(page === 2) {
            loadMore.style.display = "none";
        }
       
}

fetchData();


function printData(data) {

  

    for (let i = postNumber; i < data.length; i++) {

        const dateString = data[i].date;
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        //Image

        const blogImage = document.createElement("img");
        blogImage.classList.add("blog-image");
        blogImage.src = data[i]._embedded['wp:featuredmedia'][0].source_url;
        blogImage.alt = data[i]._embedded['wp:featuredmedia'][0].alt_text;

        //Category

        const blogCategory = document.createElement("div");
        blogCategory.classList.add("blog-category", "border-radius");
        blogCategory.innerHTML = data[i]._embedded['wp:term'][0][0].name;

        //Date

        const blogDate = document.createElement("p");
        blogDate.classList.add("blog-date");
        blogDate.innerHTML = formattedDate;

        //Category-date

        const blogCategoryDate = document.createElement("div");
        blogCategoryDate.classList.add("flex", "blog-category-date");
        blogCategoryDate.appendChild(blogCategory);
        blogCategoryDate.appendChild(blogDate);
        

        //Title

        const blogTitle = document.createElement("p");
        blogTitle.classList.add("blog-title");
        blogTitle.innerHTML = data[i].title.rendered;
     

        //Blog-card

        const blogCard = document.createElement("a");
        blogCard.classList.add("blog-card", "border-radius");
        blogCard.href=`../pages/post.html?id=${data[i].id}`;
        blogCard.appendChild(blogImage);
        blogCard.appendChild(blogCategoryDate);
        blogCard.appendChild(blogTitle);


        //Post
      
        blogContainer.appendChild(blogCard);

        if(page === 1 && i === 9) {
            break;
        }
       
    }

}


// Sort

const sortBy = document.querySelector("#sort-by");

sortBy.onchange = function() {

    postNumber = 0;

    if(sortBy.value === "alpha-asc") {
        postArray.sort((a, b) => a.title.rendered.localeCompare(b.title.rendered));
        blogContainer.innerHTML = ``;	
        printData(postArray);

    } else if(sortBy.value === "alpha-desc") {
        postArray.sort((a, b) => b.title.rendered.localeCompare(a.title.rendered));
        blogContainer.innerHTML = ``;	
        printData(postArray);

    } else if(sortBy.value === "date-desc") {
        postArray.sort((a, b) => new Date(b.date) - new Date(a.date));
        blogContainer.innerHTML = ``;	
        printData(postArray);

    } else if(sortBy.value === "date-asc") { 
        postArray.sort((a, b) => new Date(a.date) - new Date(b.date));
        blogContainer.innerHTML = ``;	
        printData(postArray);

    }

};



