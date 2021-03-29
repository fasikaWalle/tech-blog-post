
async function createPostHandler(event){
    event.preventDefault()
    const title = document.querySelector('input[name="title"]').value;
    const content = document.querySelector('textarea[name="content"]').value;
if(title && content){
    const response=await fetch('/api/posts',{
        method:"POST",
        body:JSON.stringify({title,content}),
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(response.ok){
        console.log("sucess")
        document.location.replace('/dashboard')
    }else{
        alert(response.statusText)
    }
}
}

document.querySelector(".create-post").addEventListener("submit", createPostHandler);


