
// Search icon

const searchIcon = document.querySelector(".icon-search");
const searchForm = document.querySelector(".search-bar-form");
const searchInput = document.querySelector(".search-input");
const logo = document.querySelector(".logo");


searchIcon.onclick = function() {

    searchForm.classList.add("open");
    searchIcon.classList.add("open");
    logo.classList.add("open");
    searchInput.focus();
}

searchInput.addEventListener('blur', function() {
    searchForm.classList.remove("open");
    searchIcon.classList.remove("open");
    logo.classList.remove("open");
  });

// Burger menu

const menuBtn = document.querySelector(".menu-btn");
const mobileNav = document.querySelector(".mobile-nav-wrapper");
const mobileOverlay = document.querySelector(".mobile-nav-overlay");
const body = document.querySelector("body");


mobileOverlay.onclick = function() {
    toggleMenu();
}

menuBtn.onclick = function() {
   toggleMenu();
}

function toggleMenu() {
    menuBtn.classList.toggle("open");
    mobileNav.classList.toggle("open");
    body.classList.toggle("no-scroll");
}


// Blog

const blogContainer = document.querySelector(".blog-card-container");

async function fetchData() {

    const response = await fetch("https://sindre.codes/bingo/wp-json/wp/v2/posts?_embed")
    const result = await response.json();
    printData(result)
    console.log(result);
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

        //Category

        const blogCategory = document.createElement("div");
        blogCategory.classList.add("blog-category", "border-radius");
        blogCategory.innerHTML = data[i]._embedded['wp:term'][0][0].name;
        console.log(blogCategory);

        //Date

        const blogDate = document.createElement("p");
        blogDate.classList.add("blog-date");
        blogDate.innerHTML = formattedDate;
        console.log(blogDate);

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