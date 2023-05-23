
let generatedToken = "";

async function token() {

    const data = {
        username: "admin",
        password: "123456"
    }
    
    const response = await fetch("https://sindre.codes/bingo/wp-json/jwt-auth/v1/token", {
        method: "POST",
        headers: {"Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await response.json();

    generatedToken = result.token;
   
}

token();



async function validateForm(event) {

    event.preventDefault();
    
    const subject = document.querySelector("#subject");
    const subjectError = document.querySelector("#subject-error");
    const name = document.querySelector("#name");
    const nameError = document.querySelector("#name-error");
    const email = document.querySelector("#email");
    const emailError = document.querySelector("#email-error");
    const message = document.querySelector("#message");
    const messageError = document.querySelector("#message-error");
    const sentSuccess = document.querySelector("#sent-success");
    

    if (name.value.trim().length > 5) {
      
        nameError.style.display = "none";
    } else {
    
        nameError.style.display = "block";
        validMessage = false;
     
    }
    if (validateEmail(email.value) === true) {
        emailError.style.display = "none";

    } else {
        emailError.style.display = "block";
        validMessage = false;

    }
    if (subject.value.trim().length > 15) { 
        subjectError.style.display = "none";

    } else {
        subjectError.style.display = "block";
        validMessage = false;
       
    }
    if (message.value.trim().length > 25) {
        messageError.style.display = "none";

    } else {
        messageError.style.display = "block";
        validMessage = false;
    }
    

let validMessage = true;

if (validMessage) {

    const data = {

        title: subject.value,
        acf: {
            name: name.value,
            email: email.value,
            message: message.value
        }
        

    };

    const token = generatedToken;

    const response = await fetch("https://sindre.codes/bingo/wp-json/wp/v2/form_data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })


    if (response.ok) {

        subject.value = "";
        name.value = "";
        email.value = "";
        message.value = "";
        sentSuccess.style.display = "block";
      }

    //const result = await response.json();
    //console.log(result);

    }

}





const form = document.querySelector("#contact-form");

form.addEventListener("submit", validateForm);


function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
    

}
