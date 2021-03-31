async function updateFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector('input[name="title"]').value;
  const content = document.querySelector('input[name="content"]').value;
  let post_id = window.location.toString().split("/");

  if (post_id[post_id.length - 1] === "") {
    post_id = post_id[post_id.length - 2];
    console.log(post_id);
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
      console.log("sucess");
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".update-post")
  .addEventListener("submit", updateFormHandler);
