const router = require("express").Router();
const { User } = require("../../models");

router.get("/", (req, res) => {
  User.findAll({}).then((userData) => {
    res.json(userData);
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }).then((userData) => {
    if (!userData) {
      res.status(404).json({ message: "not created" });
      return;
    }
    res.json(userData);
    console.log(userData);
  });
});
module.exports = router;
