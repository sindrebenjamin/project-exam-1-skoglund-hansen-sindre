const arrowLeft = document.querySelector(".carousel-arrow-left");
const arrowRight = document.querySelector(".carousel-arrow-right");
const slides = document.querySelectorAll(".slide");

let currentSlide = 0;
let maxSlide = slides.length - 1;


if (window.innerWidth >= 1100) {
    slides.forEach((slide, index) => {
        slide.style.transform=`translateX(${index * 100}%)`;
    });
}

    




arrowLeft.onclick = function() {
    
    if(currentSlide === 0) {
        currentSlide = maxSlide;
    } else {
        currentSlide --;
    }

    slides.forEach((slide, index) => {
        slide.style.transform=`translateX(${100 * (index - currentSlide)}%)`;
    })
    
}


arrowRight.onclick = function() {

    if(currentSlide === maxSlide) {
        currentSlide = 0;
    } else {
        currentSlide ++
    }


    slides.forEach((slide, index) => {
        slide.style.transform=`translateX(${100 * (index - currentSlide) }%)`;
    });
    
  
}


