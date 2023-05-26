const signUpForm = document.querySelector("#sign-up");
const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NpbmRyZS5jb2Rlcy9iaW5nbyIsImlhdCI6MTY4NTExOTUwNSwibmJmIjoxNjg1MTE5NTA1LCJleHAiOjE2ODU3MjQzMDUsImRhdGEiOnsidXNlciI6eyJpZCI6IjMifX19.YoRW93N9BS_uJyL1wz8_ZJc-3he7j9c7LGrXB38wf_4";


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
            userConfirmation()
        }


    } catch(error) {
        console.log(error)
    }


});



function userConfirmation() {
    signUpForm.innerHTML = `<h1>User created successfully</h1> <a href="login.html">Go to login page</a>`;
}

