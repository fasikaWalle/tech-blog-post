async function signinHandler(event) {
  event.preventDefault();
  const email = document.querySelector('input[name="email"]');
  const password = document.querySelector('input[name="password"]');

  if (email && password) {
    const response = fetch("/api/users", {
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
      window.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".signin-form")
  .addEventListener("submit", signinHandler);
