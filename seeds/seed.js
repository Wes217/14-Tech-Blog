const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require("./commentData.json")

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  User.bulkCreate(userData);
  console.log("\n--Users Seeded--\n")
  
  Post.bulkCreate(postData)
  console.log("\n--Posts Seeded--\n")

  Comment.bulkCreate(commentData)
  console.log("\n--Comments Seeded--\n")

  process.exit(0);
};

seedDatabase();
