const router = require("express").Router();
const e = require("express");
const { User } = require("../../models");

router.get("/", (req, res) => {
  User.findAll({}).then((userData) => {
    res.json(userData);
  });
});
//create user
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((userData) => {
      req.session.save(() => {
        req.session.userId = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        res.json(userData);
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//signin
router.post("/signin", (req, res) => {
  console.log(req.body);
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((dbUser) => {
      if (!dbUser) {
        res.status(404).json({ message: "there is no email by this name" });
        return;
      }
      const validPassword = dbUser.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: "Incorrect password!" });
        return;
      }
      req.session.save(() => {
        (req.session.userId = dbUser.id),
          (req.session.username = dbUser.username),
          (req.session.loggedIn = true);
        res.json(dbUser);
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;
