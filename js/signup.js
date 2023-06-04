const signUpForm = document.querySelector("#sign-up");
const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NpbmRyZS5jb2Rlcy9iaW5nbyIsImlhdCI6MTY4NTkxNTc4NSwibmJmIjoxNjg1OTE1Nzg1LCJleHAiOjE2ODY1MjA1ODUsImRhdGEiOnsidXNlciI6eyJpZCI6IjMifX19.RyQ7Yd7Lm5LnWttDAyuW88bIffPvd6ToH81Ekpk89SU";


signUpForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const emailError = document.querySelector("#email-error-signup");
    const signUpError = document.querySelector("#signup-error");
    let validEmail = false;

    if (validateEmail(email.value) === true) {
        emailError.style.display = "none";
        validEmail = true;

    } else {
        emailError.style.display = "flex";
        validEmail = false;
    }



    const data = {
        username: userName.value,
        email: email.value,
        password: password.value,
    }

    try {

        const response = await fetch(`https://sindre.codes/bingo/wp-json/wp/v2/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(response.ok) {
            //const result = await response.json();
            userConfirmation()
        } else if(!response.ok && validEmail) {
            signUpError.style.display = "block";
        }


    } catch(error) {
        console.log(error)
        
    }


});



function userConfirmation() {
    signUpForm.innerHTML = `<h1>User created successfully</h1> <a href="login.html">Go to login page</a>`;
}





function validateEmail(email) {

    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
    

}
