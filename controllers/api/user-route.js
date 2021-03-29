const router = require("express").Router();
const { User } = require("../../models");

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
    email: req.body.email,
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
router.get("/", (req, res) => {
  User.findAll({}).then((userData) => {
    res.json(userData);
  });
});

router.post('/logout',(req,res)=>{
if(req.session.loggedIn){
  req.session.destroy(()=>{
    res.status(204).end()
  })
}
  
  
})
module.exports = router;
