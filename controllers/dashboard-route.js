const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const authentication = require("../__test__/utils/authentication.js");
const sequelize = require("../config/connection");
router.get("/", authentication, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
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
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbUserData) => {
      const posts = dbUserData.map((post) => post.get({ plain: true }));
      console.log(posts);
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/edit/:id", authentication, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPost) => {
      if (dbPost) {
        const posts = dbPost.get({ plain: true });
        res.render("edit-post", {
          posts,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
