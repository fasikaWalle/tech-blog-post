const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const session = require("express-session");
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
const helpers = require("./__test__/utils/helpers");

const hbs = exphbs.create({ helpers });
const sessionStorage = require("connect-session-sequelize")(session.Store);
//Create session on database
const sess = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {},
  store: new sessionStorage({
    db: sequelize,
  }),
};

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(session(sess));
//Change data to json file
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Access static files
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./controllers/"));

//turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
