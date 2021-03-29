async function signinHandler(event) {
  event.preventDefault();
  const email = document.querySelector('input[name="email"]').value.trim();
  const password = document
    .querySelector('input[name="password"]')
    .value.trim();
  console.log(email, password);
  if (email && password) {
    const response = await fetch("/api/users/signin", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("sucess");
      document.location.replace('/dashboard/');
    } else {
      console.log(response.statusText);
    }
  }
}

document
  .querySelector(".signin-form")
  .addEventListener("submit", signinHandler);

 