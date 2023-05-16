const form = document.querySelector("#contact-form");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");

const nameError = document.querySelector("#name-error");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const message = document.querySelector("#message");
const messageError = document.querySelector("#message-error");


function validateForm(event) {
    

    const name = document.querySelector("#name");
    

    if (name.value.trim().length > 5) {
        console.log(name.value.trim().length)
        nameError.style.display = "none";
    } else {
        console.log(name.value.trim().length)
        nameError.style.display = "block";
        event.preventDefault();
    }
    if (validateEmail(email.value) === true) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
        event.preventDefault();
    }
    if (subject.value.trim().length > 15) { 
        subjectError.style.display = "none";
    } else {
        subjectError.style.display = "block";
        event.preventDefault();
    }
    if (message.value.trim().length > 25) {
        messageError.style.display = "none";
    } else {
        messageError.style.display = "block";
        event.preventDefault();
    }
}

form.addEventListener("submit", validateForm);



function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}
