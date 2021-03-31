//Save liked posts
async function likeEventHandler(event) {
  event.preventDefault();
  let post_id = event.target.getAttribute("data-post-id");

  const response = await fetch("/api/posts/like", {
    method: "PUT",
    body: JSON.stringify({
      post_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.reload();
  } else {
    document.location.replace("/signin");
  }
}

document.querySelectorAll(".like").forEach((element) => {
  element.addEventListener("click", likeEventHandler);
});
