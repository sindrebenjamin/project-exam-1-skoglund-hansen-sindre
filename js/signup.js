const signUpForm = document.querySelector("#sign-up");
const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NpbmRyZS5jb2Rlcy9iaW5nbyIsImlhdCI6MTY4NTAxMzk2NiwibmJmIjoxNjg1MDEzOTY2LCJleHAiOjE2ODU2MTg3NjYsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.1qO2VQaKnmcXVJkWKJfWGoFMHbLFYWgvtRGW6cBrfUQ";


signUpForm.addEventListener("submit", async (event) => {
   

    console.log(userName.value + email.value + password.value)
    event.preventDefault();
   

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
            const result = await response.json();
            console.log(result);
            window.location.href="login.html"
        }


    } catch(error) {
        console.log(error)
    }


});