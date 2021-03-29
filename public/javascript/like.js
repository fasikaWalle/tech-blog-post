
async function likeEventHandler(event){
    event.preventDefault();
    console.log(event.target)

    // console.log(id);
// const response=fetch('/api/likes',{
//    method:"POST",
//    body:JSON.stringify({}),
//    headers:{
//        "Content-Type":"application/json"
//    }
// })  
// if(response.ok){
//     alert("yeaa")
// }
}
async function commentHandler(event){
    event.preventDefault();
    
    
    
}


document.querySelectorAll(".like").forEach(element=>{
    element.addEventListener("click", likeEventHandler);
})
document.querySelector(".comment").addEventListener("click", commentHandler);

