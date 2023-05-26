const loginForm = document.querySelector("#login");
const userName = document.querySelector("#username");
const password = document.querySelector("#password");

// localStorage.clear();

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    //localStorage.clear();
   

    const data = {
        username: userName.value,
        password: password.value
    }

    try {

        const response = await fetch(`https://sindre.codes/bingo/wp-json/jwt-auth/v1/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if(response.ok) {
            const result = await response.json();
            console.log(result);
            window.localStorage.setItem("token", result.token);
            window.localStorage.setItem("user_email", result.user_email);
            fetchUser(result)
        }


    } catch(error) {

    }


});



