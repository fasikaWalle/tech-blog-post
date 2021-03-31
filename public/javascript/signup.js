async function signupFormHandler(event) {
  event.preventDefault();

  let alert = document.createElement("div");
  alert.className = "alert alert-danger";
  let form = document.querySelector(".signup-form");

  const username = document.querySelector('input[name="username"]').value.trim();
  const password = document.querySelector('input[name="password"]').value.trim();

  if (username && password) {
    const response = await fetch("/api/users/signup", {
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
    } else {
      alert.textContent = "User already exsist please change your user name";
      form.appendChild(alert);
      document.location.reload();
    }
  }
}

document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);
