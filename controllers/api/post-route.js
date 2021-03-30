const router = require("express").Router();
const { Post, User, Likes, Comment } = require("../../models");
const authentication = require("../../utils/authentication");
const sequelize = require("../../config/connection");

//Find one post
// router.put("/like", (req, res) => {
//   if (req.session.user_id) {
//     req.body.user_id = req.session.user_id;
//     Post.postLike(req.body, { Likes })
//       .then((userData) => {
//         res.json(userData);
//       })
//       .catch((err) => {
//         res.status(500).json(err);
//       });
//   }
// });
router.put("/like", (req, res) => {
  // custom static method created in models/Post.js
  Likes.findOne({
    where: {
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    },
  })
    .then((data) => {
      console.log(data);
      if (data) {
        res.json({ message: "post already liked by the current user" });
        return;
      } else {
        Post.postLike(
          { ...req.body, user_id: req.session.user_id },
          { Likes, Comment, User }
        )
          .then((updateLike) => res.json(updateLike))
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
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
router.post("/", authentication, (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id,
  })
    .then((dbPost) => res.json(dbPost))
    .catch((err) => {
      res.status(500).json(err);
    });
});

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
      res.render("edit-post", dbPost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Delete a post
router.delete("/:id", authentication, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPost) => {
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
});

//Find all posts
router.get("/", (req, res) => {
  Post.findAll({}).then((dbUser) => {
    res.json(dbUser);
  });
});

module.exports = router;
