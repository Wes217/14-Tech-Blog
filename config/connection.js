const Sequelize = require('sequelize');
const config = require("./config");

let sequelize;

if (config.production.use_env_variable) {
  sequelize = new Sequelize(config.production.use_env_variable);
} else {
  sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
