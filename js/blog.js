let categories = new URLSearchParams(window.location.search).get('categories');
const loadMore = document.querySelector(".load-more");
const categoryPill = document.querySelector(".category-pill");
const categorySelect = document.querySelector("#category-select");
const loader = document.querySelector(".loader");

// Categories

const categoryPillsUnselected = document.querySelectorAll(".category-pill-unselected");

categoryPillsUnselected.forEach(function(pill){
    pill.onclick = function() {
        window.location.href = `../pages/blog.html?categories=${pill.id}`;
    }
})

function categoryIdToString(category) {
    if(category === "67") {
        categorySelect.value = "67";
        document.getElementById(`67`).style.display="none";
        return "Sound design";
       
    } 
    
    if(category === "63") {
        categorySelect.value = "63";
        document.getElementById(`63`).style.display="none";
        return "Production tips";
    }
    if(category === "52") {
        categorySelect.value = "52";
        document.getElementById(`52`).style.display="none";
        return "Mixing and mastering";
    }
    if(category === "40") {
        categorySelect.value = "40";
        document.getElementById(`40`).style.display="none";
        return "Gear";
    }
    if(category === "46") {
        categorySelect.value = "46";
        document.getElementById(`46`).style.display="none";
        return "Inspiration";
    }
    if(category === "59") {
        categorySelect.value = "59";
        document.getElementById(`59`).style.display="none";
        return "Music theory";
    }
}

if(categories === null) {
    categoryParameter = ``;
    categoryPill.style.display = "none";
} else {
    
    categoryPill.style.display = "flex";
    categoryParameter = `&categories=${categories}`;
    loadMore.style.display = "none";
    categoryPill.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.25491 3.25496C3.37796 3.13207 3.54475 3.06304 3.71866 3.06304C3.89257 3.06304 4.05936 3.13207 4.18241 3.25496L6.99991 6.07246L9.81741 3.25496C9.89762 3.16858 9.99965 3.10543 10.1127 3.07216C10.2258 3.0389 10.3458 3.03676 10.46 3.06596C10.5742 3.09516 10.6784 3.15463 10.7617 3.23809C10.8449 3.32155 10.9041 3.42593 10.933 3.54021C10.9623 3.65429 10.9602 3.77414 10.9271 3.88716C10.894 4.00017 10.8311 4.10219 10.7449 4.18246L7.92741 6.99996L10.7449 9.81746C10.8313 9.89767 10.8944 9.9997 10.9277 10.1128C10.961 10.2259 10.9631 10.3459 10.9339 10.4601C10.9047 10.5743 10.8452 10.6785 10.7618 10.7617C10.6783 10.845 10.5739 10.9042 10.4597 10.9331C10.3456 10.9623 10.2257 10.9603 10.1127 10.9272C9.9997 10.8941 9.89769 10.8311 9.81741 10.745L6.99991 7.92746L4.18241 10.745C4.05793 10.8608 3.89339 10.9239 3.72336 10.921C3.55333 10.918 3.39106 10.8493 3.27066 10.7292C3.15057 10.6088 3.08184 10.4465 3.0789 10.2765C3.07596 10.1065 3.13905 9.94194 3.25491 9.81746L6.07241 6.99996L3.25491 4.18246C3.13202 4.05941 3.06299 3.89262 3.06299 3.71871C3.06299 3.5448 3.13202 3.37801 3.25491 3.25496Z" fill="white"/>
    </svg>
    ` + categoryIdToString(categories);	
}


categorySelect.onchange = function() {

    if(categorySelect.value === "all") {
        window.location.href = "../pages/blog.html";
    } else {
    window.location.href = `../pages/blog.html?categories=${categorySelect.value}`;
    };
}

categoryPill.onclick = function() {
    window.location.href = "../pages/blog.html";
}

const blogContainer = document.querySelector(".blog-card-container");
let page = 1;
let postNumber = 0;
let postArray = [];


// Fetch data

async function fetchData() {
    
    
    try {
        
            const response = await fetch(`https://sindre.codes/bingo/wp-json/wp/v2/posts?_embed&per_page=20${categoryParameter}`);
            const result = await response.json();

            if (response.ok) {

                postArray.push(...result);
                printData(postArray);

            }
           
            
    }
    
    catch (error) {
        blogContainer.innerHTML = "An error occured";
  
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


//Search


let searchQuery = new URLSearchParams(window.location.search).get('search');
let printedResults = 0;



function countResults() {

if (printedResults >= 9) {
    loadMore.style.display = "flex";
} else {
    loadMore.style.display = "none";
}

}





function printData(data) {

    loader.style.display = "none";


    for (let i = postNumber; i < data.length; i++) {

        postContent = data[i].content.rendered.toLowerCase();
        postTitle = data[i].title.rendered.toLowerCase();
        postCategory = data[i]._embedded['wp:term'][0][0].name.toLowerCase();


        if(searchQuery === null) {
            searchString = "";
        } else {
            searchString = searchQuery.toLowerCase();
        }
       
        

        if(postContent.includes(searchString) || postTitle.includes(searchString) || postCategory.includes(searchString) || searchQuery === null) {

        printedResults++;
        countResults();
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



