const router = require("express").Router();
const { User } = require("../../models");
const authentication = require("../../__test__/utils/authentication");
//signin
router.post("/signin", (req, res) => {
  console.log(req.body);
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((dbUser) => {
      if (!dbUser) {
        res.status(404).json({ message: "there is no user by this name" });
        return;
      }
      const validPassword = dbUser.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: "Incorrect password!" });
        return;
      }
      req.session.save(() => {
        (req.session.user_id = dbUser.id),
          (req.session.username = dbUser.username),
          (req.session.loggedIn = true);
        res.json({ user: dbUser });
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//create user

router.post("/signup", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((userData) => {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        res.json(userData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.post("/", authentication, (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },
    attributes: ["username"],
  })
    .then((userData) => {
      console.log(userData);
      const post = userData.get({ plain: true });
      res.json(post);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.get("/", authentication, (req, res) => {
  User.findAll({}).then((userData) => {
    res.json(userData);
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
});
module.exports = router;
