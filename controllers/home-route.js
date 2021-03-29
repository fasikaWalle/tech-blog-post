const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const authentication = require('../utils/authentication')

router.get("/", (req, res) => {
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["comment_text", "user_id", "post_id"],
      },
    ],
  }).then((userData) => {
    if (!userData) {
      res.status(404).json({ message: "not found" });
      return;
    }
    const posts = userData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("home", { posts ,loggedIn:req.session.loggedIn});
  });
});
router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});



module.exports = router;
