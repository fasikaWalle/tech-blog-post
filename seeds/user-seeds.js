const sequelize = require("../config/connection");
const { User } = require("../models");

const userdata = [
  {
    username: "Helen",
    password: "admin",
  },
  {
    username: "Fasika",
    password: "admin",
  },
  {
    username: "Mahi",
    password: "admin",
  },
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;
