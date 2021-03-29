const router=require('express').Router();
const {Post,User,Like}=require('../../models')
const authentication = require('../../utils/authentication')
const sequelize=require("../../config/connection")


router.get('/like',authentication,(req,res)=>{
    Like.findAll({ 
        attributes:["user_id","post_id"]}).then(data=>{
       
        console.log(data)
        res.json(data)
    
        
    }).catch(err=>{res.json(err)})

  })
  router.post('/like',authentication,(req,res)=>{
      Post.findOne({})
    
    
    Like.create({
      post_id:req.body.post_id,
      user_id:req.session.user_id
    }).then(data=>{
        console.log(data)
      res.json(data)
    }).catch(err=>{res.json(err)})
  })
  
  
module.exports=router;