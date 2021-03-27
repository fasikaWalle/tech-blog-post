const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const session = require("express-session");
const sequelize = require("./config/connection");

const sessionStorage = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {},
  store: new sessionStorage({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
