async function editFormHandler(event) {
  event.preventDefault();
  // console.log(event.target.getAttribute("data-post-username"));
  let username = event.target.getAttribute("data-post-username");
  let id = event.target.getAttribute("data-post-id");
  let currentUser;
  await fetch("/api/users/", {
    method: "POST",
    body: JSON.stringify({ username }),

    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      currentUser = data.username;
    });
  if (username === currentUser) {
    window.location.replace(`/dashboard/edit/${id}`);
  } else {
    console.log("oops");
  }
}

document.querySelectorAll(".edit-posts").forEach((element) => {
  element.addEventListener("click", editFormHandler);
});
