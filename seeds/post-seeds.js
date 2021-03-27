const { Post } = require("../models");

const postdata = [
  {
    title: "this is my first post",
    content: "I am glad that I am here",
    user_id: 1,
  },
  {
    title: "this is my second post",
    content: "hello everyone",
    user_id: 2,
  },
];

const seedLikes = () => Post.bulkCreate(postdata);

module.exports = seedLikes;
