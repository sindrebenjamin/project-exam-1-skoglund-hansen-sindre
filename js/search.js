function search() {

    const searchForm = document.querySelector("#search-form");
    const searchInput = document.querySelector("#search");

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const searchValue = searchInput.value;

    
        window.location.href = `../pages/blog.html?search=${searchValue}`;
    
    });
}

search();



