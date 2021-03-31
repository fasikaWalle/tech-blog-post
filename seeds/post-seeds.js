const { Post } = require("../models");

const postdata = [
  {
    title: "LinkedIn confirms it’s working on a Clubhouse rival, too",
    content:
      "LinkedIn has now confirmed it’s also testing a social audio experience in its app which would allow creators on its network to connect with their community. ",
    user_id: 1,
  },
  {
    title: "The Weird Science of Loneliness and Our Brains",
    content:
      "Social isolation has been linked to poorer physical and mental health, but scientists are finally starting to understand.",
    user_id: 2,
  },
];

const seedLikes = () => Post.bulkCreate(postdata);

module.exports = seedLikes;
