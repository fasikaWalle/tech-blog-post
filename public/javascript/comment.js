//Post comment
async function commentHandler(event) {
  event.preventDefault();
  const comment_text = document.querySelector('textarea[name="comment_text"]').value.trim();
  let post_id = window.location.toString().split("/");
  
  //check if the url last is '/' or not
  if (post_id[post_id.length - 1] === "") {
    post_id = post_id[post_id.length - 2];
  } else {
    post_id = post_id[post_id.length - 1];
  }

  
  if (comment_text) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelectorAll(".comment-form").forEach((element) => {
  element.addEventListener("click", commentHandler);
});
