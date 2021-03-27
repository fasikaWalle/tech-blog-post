const { Post } = require("../models");

const postdata = [
  {
    title: "Donec posuere metus vitae ipsum.",
    content: "helosdas sadsad sad",
    user_id: 1,
  },
  {
    title: "Morbi non quam nec dui luctus rutrum.",
    content: "this is asadasdasdasd",
    user_id: 2,
  },
];

const seedLikes = () => Post.bulkCreate(postdata);

module.exports = seedLikes;
