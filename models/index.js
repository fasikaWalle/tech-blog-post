const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Like = require("../models/Like");

//user have one to many relationship with the post

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

User.hasMany(Post, {
  foreignKey: "user_id",
});

//creating many to many relationship

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "cascade",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});
Post.hasMany(Comment, {
  foreignKey: "post_id",
});

//creating likes relations
User.belongsToMany(Post, {
  through: Like,
  foreignKey: "post_id",
});
Post.belongsToMany(User, {
  through: Like,
  foreignKey: "user_id",
  onDelete:"cascade"
});

Like.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Like.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "cascade",
});

User.hasMany(Like, {
  foreignKey: "user_id",
});

Post.hasMany(Like, {
  foreignKey: "post_id",
});

module.exports = { Post, User, Comment, Like };
