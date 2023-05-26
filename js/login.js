const loginForm = document.querySelector("#login");
const userName = document.querySelector("#username");
const password = document.querySelector("#password");
const loginError = document.querySelector("#login-error");


loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();


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
            window.localStorage.setItem("token", result.token);
            window.localStorage.setItem("user_email", result.user_email);
            window.localStorage.setItem("username", result.user_display_name);
            window.location.href="../index.html"
        } else if(!response.ok) {
            loginError.style.display = "flex";
        }


    } catch(error) {

        console.log("hei")
        console.log(error)
        

    }


});



