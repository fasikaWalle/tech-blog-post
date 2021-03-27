const router = require("express").Router();
const { Post, User } = require("../models");
router.get("/", (req, res) => {
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  }).then((userData) => {
    if (!userData) {
      res.status(404).json({ message: "not found" });
      return;
    }
    const posts = userData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("home", { posts });
  });
});
router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});
module.exports = router;
