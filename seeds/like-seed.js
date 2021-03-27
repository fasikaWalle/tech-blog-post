const { Like } = require("../models");
const data = [
  {
    user_id: 1,
    post_id: 1,
  },
  {
    user_id: 2,
    post_id: 1,
  },
];

const seedLikes = () => Like.bulkCreate(data);

module.exports = seedLikes;

module.exports = seedLikes;
