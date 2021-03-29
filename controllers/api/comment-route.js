const router=require('express').Router()
const {Comment}=require('../../models')
const authentication = require('../../utils/authentication')

router.get('/',(req,res)=>{
    
    Comment.findAll({ }).then(dbComment=>{
        res.json(dbComment)
    })
    
})

//Create a comment
router.post("/", authentication, (req, res) => {
    Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    })
      .then((dbComment) => res.json(dbComment))
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  //Delete a comment
router.delete("/:id", (req, res) => {
    Comment.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbComment) => {
        if (!dbComment) {
          res.status(404).json({ message: "There is no comment by this id"});
          return;
        }
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
  
  
  module.exports=router;