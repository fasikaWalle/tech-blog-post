

async function deletePostHandler(event){
    event.preventDefault()
    let post_id = window.location.toString().split("/");
  
    if (post_id[post_id.length - 1] === "") {
      post_id = post_id[post_id.length - 2];
      console.log(post_id);
    } else {
      post_id = post_id[post_id.length - 1];
    }

    const response=await fetch(`/api/posts/${post_id}`,{
        method:'DELETE',
        headers:{
            "Content-Type":"application/json"
        }
    })
    
    if(response.ok){
        document.location.replace('/dashboard')
    }else{
        alert(response.statusText)
    }
}





document.querySelector("#delete").addEventListener("click", deletePostHandler);
