const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require("./commentData.json")

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("\n--DataBase Synced--\n")

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log("\n--Users Seeded--\n")
  
  await Post.bulkCreate(postData);
  console.log("\n--Posts Seeded--\n")

  await Comment.bulkCreate(commentData);
  console.log("\n--Comments Seeded--\n")

  process.exit(0);
};

seedDatabase();
