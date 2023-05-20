// Blog

const categories = new URLSearchParams(window.location.search).get('categories');
const loadMore = document.querySelector(".load-more");


const blogContainer = document.querySelector(".blog-card-container");
let page=1;
let unsortedPosts = [];

async function fetchData() {
    try {
        if (categories===null) {
        
            const response = await fetch(`https://sindre.codes/bingo/wp-json/wp/v2/posts?_embed&page=${page}`);
            const result = await response.json();
            printData(result)
            unsortedPosts.push(...result);
            

            } else {
          
                loadMore.style.display="none";
                const response = await fetch(`https://sindre.codes/bingo/wp-json/wp/v2/posts?_embed&categories=${categories}`);
                const result = await response.json();
                printData(result)
                
   
            }
    }
    catch(error) {
        blogContainer.innerHTML = "An error occured";
        console.log(error);
    }

   

    
}

loadMore.onclick = function() {
    if (categories===null) {
        page++;
        fetchData();
    }
}

fetchData();


function printData(data) {

  

    for (let i = 0; i < data.length; i++) {

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
       
    }

}


// Sort

const sortBy = document.querySelector("#sort-by");

sortBy.onchange = function() {
    const sortByValue = sortBy.value;
    console.log(sortByValue);

    console.log(unsortedPosts)
}


let testArray = ["5000", "300", "2", "40", "10"];



const sortedArray = testArray.sort((a, b) => a.length - b.length);

console.log(sortedArray)