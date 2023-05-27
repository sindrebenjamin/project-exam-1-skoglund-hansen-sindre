const musicTheoryButton = document.querySelector(".music-theory-category");
const inspirationButton = document.querySelector(".inspiration-category");
const gearButton = document.querySelector(".gear-category");
const mixingMasteringButton = document.querySelector(".mixing-mastering-category");
const productionButton = document.querySelector(".production-category");
const soundDesignButton = document.querySelector(".sound-design-category");



soundDesignButton.onclick = function() {
     const categories = [67];
     const urlParams = new URLSearchParams(window.location.search);
     urlParams.set('categories', categories[0]);
     window.location.href = `../pages/blog.html?${urlParams}`;
 }

productionButton.onclick = function() {
    const categories = [63];
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('categories', categories[0]);
    window.location.href = `../pages/blog.html?${urlParams}`;
}

mixingMasteringButton.onclick = function() {
    const categories = [52];
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('categories', categories[0]);
    window.location.href = `../pages/blog.html?${urlParams}`;
}

gearButton.onclick = function() {
    const categories = [40];
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('categories', categories[0]);
    window.location.href = `../pages/blog.html?${urlParams}`;
}

inspirationButton.onclick = function() {
    const categories = [46];
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('categories', categories[0]);
    window.location.href = `../pages/blog.html?${urlParams}`;
}

musicTheoryButton.onclick = function() {
    const categories = [59];
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('categories', categories[0]);
    window.location.href = `../pages/blog.html?${urlParams}`;
}


// Featured

const featuredContainer = document.querySelector(".featured-container");


async function fetchData() {

  try {

    const response = await fetch("https://sindre.codes/bingo/wp-json/wp/v2/posts?_embed");
    const result = await response.json();

    if (response.ok) {
      printFeatured(result);
      printCarousel(result);
    }
  

  } catch {

    featuredContainer.innerHTML = `An error occured`;
  

  }

    
}

fetchData();

function printFeatured(data) {


  featuredContainer.innerHTML = ``;

  let featuredNumber = 3;


  const dateString = data[featuredNumber].date;
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

      //Image

      const blogImage = document.createElement("img");
      blogImage.classList.add("blog-image-featured");
      blogImage.src = data[featuredNumber]._embedded['wp:featuredmedia'][0].source_url;
      blogImage.alt = data[featuredNumber]._embedded['wp:featuredmedia'][0].alt_text;

      //Category

      const blogCategory = document.createElement("div");
      blogCategory.classList.add("blog-category");
      blogCategory.innerHTML = data[featuredNumber]._embedded['wp:term'][0][0].name;
  

      //Date

      const blogDate = document.createElement("p");
      blogDate.classList.add("blog-date");
      blogDate.innerHTML = formattedDate;


      //Category-date

      const blogCategoryDate = document.createElement("div");
      blogCategoryDate.classList.add("blog-category-date");
      blogCategoryDate.appendChild(blogCategory);
      blogCategoryDate.appendChild(blogDate);
      

      //Title

      const blogTitle = document.createElement("p");
      blogTitle.classList.add("blog-title-featured");
      blogTitle.innerHTML = data[featuredNumber].title.rendered;


      //Excerpt

      const blogExcerpt = document.createElement("p");
      blogExcerpt.classList.add("blog-excerpt");
      blogExcerpt.innerHTML = data[featuredNumber].excerpt.rendered;
   

      //Blog-card

      const blogCard = document.createElement("div");
      blogCard.classList.add("blog-card-featured");
    
      blogCard.appendChild(blogCategoryDate);
      blogCard.appendChild(blogTitle);
      blogCard.appendChild(blogExcerpt);
      blogCard.innerHTML += `<a href="../pages/post.html?id=${data[featuredNumber].id}" class="button-outlined">
      <span>Read more</span
      ><svg
        width="15"
        height="8"
        viewBox="0 0 15 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.3536 4.35355C14.5488 4.15829 14.5488 3.84171 14.3536 3.64645L11.1716 0.464466C10.9763 0.269204 10.6597 0.269204 10.4645 0.464466C10.2692 0.659728 10.2692 0.976311 10.4645 1.17157L13.2929 4L10.4645 6.82843C10.2692 7.02369 10.2692 7.34027 10.4645 7.53553C10.6597 7.7308 10.9763 7.7308 11.1716 7.53553L14.3536 4.35355ZM0 4.5H14V3.5H0V4.5Z"
          fill="#111111"
        />
      </svg>
    </a>`;


      //Post

      featuredContainer.appendChild(blogImage);
      featuredContainer.appendChild(blogCard);
      
}


// Carousel

function printCarousel(data) {


  const slide1 = document.querySelector(".slide-1");
  const slide2 = document.querySelector(".slide-2");
  const slide3 = document.querySelector(".slide-3");

  slide1.innerHTML = ``;


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
    blogCategory.classList.add("blog-category");
    blogCategory.innerHTML = data[i]._embedded['wp:term'][0][0].name;
 

    //Date

    const blogDate = document.createElement("p");
    blogDate.classList.add("blog-date");
    blogDate.innerHTML = formattedDate;


    //Category-date

    const blogCategoryDate = document.createElement("div");
    blogCategoryDate.classList.add("blog-category-date");
    blogCategoryDate.appendChild(blogCategory);
    blogCategoryDate.appendChild(blogDate);
    

    //Title

    const blogTitle = document.createElement("p");
    blogTitle.classList.add("blog-title");
    blogTitle.innerHTML = data[i].title.rendered;
 
    //Blog-text 

    const blogText = document.createElement("div");
    blogText.classList.add("blog-text");
    blogText.appendChild(blogCategoryDate);
    blogText.appendChild(blogTitle);
   
  
    //Blog-card
  
    const blogCard = document.createElement("a");
    blogCard.classList.add("blog-card");
    blogCard.href=`../pages/post.html?id=${data[i].id}`;
    blogCard.appendChild(blogImage);
    blogCard.appendChild(blogText);

    slide1.appendChild(blogCard);

    if (i === 2) {
      break;
    }
  }

  for (let i = 3; i < data.length; i++) {
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
    blogCategory.classList.add("blog-category");
    blogCategory.innerHTML = data[i]._embedded['wp:term'][0][0].name;
     
  
    //Date
  
    const blogDate = document.createElement("p");
    blogDate.classList.add("blog-date");
    blogDate.innerHTML = formattedDate;
      
  
    //Category-date
  
    const blogCategoryDate = document.createElement("div");
    blogCategoryDate.classList.add("blog-category-date");
    blogCategoryDate.appendChild(blogCategory);
    blogCategoryDate.appendChild(blogDate);
      
  
    //Title
  
    const blogTitle = document.createElement("p");
    blogTitle.classList.add("blog-title");
    blogTitle.innerHTML = data[i].title.rendered;


    //Blog-text 

    const blogText = document.createElement("div");
    blogText.classList.add("blog-text");
    blogText.appendChild(blogCategoryDate);
    blogText.appendChild(blogTitle);
      
     
    //Blog-card
     
    const blogCard = document.createElement("a");
    blogCard.classList.add("blog-card");
    blogCard.href=`../pages/post.html?id=${data[i].id}`;
    blogCard.appendChild(blogImage);
    blogCard.appendChild(blogText);
  
    slide2.appendChild(blogCard);
  
      if (i === 5) {
        break;
      }

    
  }

  for (let i = 6; i < data.length; i++) {
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
      blogCategory.classList.add("blog-category");
      blogCategory.innerHTML = data[i]._embedded['wp:term'][0][0].name;
    
  
      //Date
  
      const blogDate = document.createElement("p");
      blogDate.classList.add("blog-date");
      blogDate.innerHTML = formattedDate;
      
  
      //Category-date
  
      const blogCategoryDate = document.createElement("div");
      blogCategoryDate.classList.add("blog-category-date");
      blogCategoryDate.appendChild(blogCategory);
      blogCategoryDate.appendChild(blogDate);
      
  
      //Title
  
      const blogTitle = document.createElement("p");
      blogTitle.classList.add("blog-title");
      blogTitle.innerHTML = data[i].title.rendered;

      //Blog-text 

      const blogText = document.createElement("div");
      blogText.classList.add("blog-text");
      blogText.appendChild(blogCategoryDate);
      blogText.appendChild(blogTitle);
   
  
      //Blog-card
  
      const blogCard = document.createElement("a");
      blogCard.classList.add("blog-card");
      blogCard.href=`../pages/post.html?id=${data[i].id}`;
      blogCard.appendChild(blogImage);
      blogCard.appendChild(blogText);
      
  
      slide3.appendChild(blogCard);
  
      if (i === 8) {
        break;
      }

      

  }

}

