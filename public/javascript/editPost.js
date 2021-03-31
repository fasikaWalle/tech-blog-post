//Update post
async function updateFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector('input[name="title"]').value.trim();
  const content = document.querySelector('input[name="content"]').value.trim();
  let post_id = window.location.toString().split("/");

  if (post_id[post_id.length - 1] === "") {
    post_id = post_id[post_id.length - 2];
  } else {
    post_id = post_id[post_id.length - 1];
  }

  if (title && content) {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".update-post")
  .addEventListener("submit", updateFormHandler);
