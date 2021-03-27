const sequelize = require("../config/connection");
const { User } = require("../models");

const userdata = [
  {
    username: "Helen",
    email: "helu@gmail.com",
    password: "password123",
  },
  {
    username: "Fasika",
    email: "fasik@gmail.com",
    password: "password123",
  },
  {
    username: "James",
    email: "James@gmail.com",
    password: "password123",
  },
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;
