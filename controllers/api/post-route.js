const router=require('express').Router();
const {Post,User,Like}=require('../../models')
const authentication = require('../../utils/authentication')
const sequelize=require("../../config/connection")

//Find one post

router.get("/:id",(req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "content",
      "created_at",
      [sequelize.literal('(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)'), 'likes']
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbUser) => {
      if (!dbUser) {
        res.status(404).json({ message: "no post found with this id" });
        return;
      }
      res.json(dbUser);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Create post
router.post('/',authentication,(req,res)=>{
    console.log(req.body,req.session.user_id)
   Post.create({
    title:req.body.title,
    content:req.body.content,
    user_id:req.session.user_id
   }) .then(dbPost => res.json(dbPost))
   .catch(err => {
     res.status(500).json(err);
   });
})
//Update post

router.put("/:id", authentication, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPost) => {
      if (!dbPost) {
        res.status(404).json({ message: "There is no post with this id" });
        return;
      }
      res.render("edit-post",dbPost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//update post
// authoh

//Delete a post 
router.delete('/:id',authentication,(req,res)=>{
  Post.destroy({
    where:{
      id:req.params.id
    }
  })  .then((dbPost) => {
    if (!dbPost) {
      res.status(404).json({ message: "There is no post with this id" });
      return;
    }
    res.json(dbPost);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
})

  //Find all posts
router.get('/',(req,res)=>{
  Post.findAll({}).then(dbUser=>{
    res.json(dbUser)
  })
})



module.exports=router;