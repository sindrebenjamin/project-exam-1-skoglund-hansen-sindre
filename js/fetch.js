const featuredContainer = document.querySelector(".featured-container");




async function fetchData() {

    const response = await fetch("https://sindre.codes/bingo/wp-json/wp/v2/posts?_embed");
    const result = await response.json();
    printFeatured(result);
}

fetchData();


function printFeatured(data) {
    console.log(data)

    let featuredNumber = 3;


    console.log(data[featuredNumber].title.rendered);
    const dateString = data[featuredNumber].date;
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    

  

        

        //Image

        const blogImage = document.createElement("img");
        blogImage.classList.add("blog-image-featured");
        blogImage.src = data[featuredNumber]._embedded['wp:featuredmedia'][0].source_url;

        //Category

        const blogCategory = document.createElement("div");
        blogCategory.classList.add("blog-category", "border-radius");
        blogCategory.innerHTML = data[featuredNumber]._embedded['wp:term'][0][0].name;
    

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
        blogTitle.innerHTML = data[featuredNumber].title.rendered;
     

        //Blog-card

        const blogCard = document.createElement("a");
        blogCard.classList.add("blog-card-featured");
        blogCard.href=`../pages/post.html?id=${data[featuredNumber].id}`;
        blogCard.appendChild(blogImage);
        blogCard.appendChild(blogCategoryDate);
        blogCard.appendChild(blogTitle);


        //Post
      
        featuredContainer.appendChild(blogCard);
        console.log(featuredContainer);
       
 
  
}