const router = require("express").Router();
const { User } = require("../../models");

router.use("/", (req, res) => {
  User.findAll({}).then((userData) => {
    res.json(userData);
  });
});

module.exports = router;
