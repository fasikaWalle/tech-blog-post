const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const authentication = require("../__test__/utils/authentication.js");


router.get('/',authentication,(req,res)=>{
    console.log("true")
    res.render("createpost")
  })
  
  
  module.exports=router