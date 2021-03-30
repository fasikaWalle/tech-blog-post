// const router=require('express').Router();
// const {Post,User,Likes}=require('../../models')
// const authentication = require('../../utils/authentication')
// const sequelize=require("../../config/connection")

//   router.post('/',(req,res)=>{
//     Likes.create({
//       user_id:req.session.user_id,
//       post_id:req.body.post_id
//     }).then(data=>{
//         console.log(data)
//       res.json(data)
//     }).catch(err=>{res.json(err)})
//   })

// router.get('/',(req,res)=>{
//     Likes.findAll({ 
//         attributes:["user_id","post_id"]}).then(data=>{
//         res.json(data)
//     }).catch(err=>{res.json(err)})

//   })
// module.exports=router;