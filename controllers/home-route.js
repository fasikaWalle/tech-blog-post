const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const authentication = require("../__test__/utils/authentication");
const sequelize = require("../config/connection");
router.get("/", (req, res) => {
  Post.findAll({
    attributes: [
      "id",
      "title",
      "content",
      "created_at",
      [
        sequelize.literal(
          `(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)`
        ),
        "likes",
      ],
    ],

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
    res.render("home", { posts, loggedIn: req.session.loggedIn });
  });
});
router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/post/:id", authentication, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "content",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)"
        ),
        "likes",
      ],
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbUser) => {
      if (!dbUser) {
        res.status(404).json({ message: "no post found with this id" });
        return;
      }
      const posts = dbUser.get({ plain: true });
      console.log(posts);
      if (req.session) {
        res.render("singlepost", { posts, loggedIn: req.session.loggedIn });
      } else {
        res.json({message:"Please login first"})
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
