
//Signin
let alert = document.createElement("div");
async function signinHandler(event) {
  alert.className = "alert alert-danger";
  alert.textContent="";
  let form = document.querySelector(".signin-form");
  event.preventDefault();

  const username = document.querySelector('input[name="username"]').value.trim();
  const password = document.querySelector('input[name="password"]').value.trim();

  if (username && password) {
    const response = await fetch("/api/users/signin", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("sucess");
      document.location.replace("/dashboard/");
    }
    else {
      
      alert.textContent = "Please insert a valid user";
      form.appendChild(alert);
    }
  }
}

document.querySelector(".signin-form").addEventListener("submit", signinHandler);
