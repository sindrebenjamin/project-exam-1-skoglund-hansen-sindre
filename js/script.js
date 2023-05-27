// Check login

const loginButton = document.querySelector(".login-button");
const logoutButton = document.querySelector(".logout-button");
const userContainer = document.querySelector(".user-container");
const userWrapper = document.querySelector(".user-wrapper");
const loginContainer = document.querySelector(".login-container");

if(window.localStorage.getItem("token")) {

    loginContainer.style.display = "none";
    userWrapper.style.display = "flex";
    userContainer.innerHTML = `Hi, ${window.localStorage.getItem("username")}`;
    
} else {
   
    userWrapper.style.display = "none";
    
}

logoutButton.onclick = function() {
    localStorage.clear();
    
}


// Search bar

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


