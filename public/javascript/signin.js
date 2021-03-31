async function signinHandler(event) {
  event.preventDefault();
  const username = document.querySelector('input[name="username"]').value.trim();
  const password = document.querySelector('input[name="password"]')
    .value.trim();
  console.log(username, password);
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
    } else {
      console.log(response.statusText);
    }
  }
}

document
  .querySelector(".signin-form")
  .addEventListener("submit", signinHandler);
