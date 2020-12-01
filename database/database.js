const Sequelize = require("sequelize");

const connection = new Sequelize('guidepress', 'root', 'password', {
    host : 'localhost',
    dialect : 'mysql',
    timezone : '-03:00'
});

module.exports = connection;