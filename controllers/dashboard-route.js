const router = require("express").Router();
const { User, Post } = require("../models");
router.get("/", (req, res) => {
  Post.findAll({
    attributes=["id","title","content","user_id","createdAt"],
    
  }).then(postData=>{
    if(!postData){
      res.status(404).json()
    }
    const posts= postData.map(post.get({plain:true}))
    res.render("dashboard",posts)
  })
});
module.exports = router;
