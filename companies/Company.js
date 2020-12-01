const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Company = connection.define('companies', {
    name : {
        type : Sequelize.STRING,
        alowNull : false
    },
    slug : {
        type : Sequelize.STRING,
        allowNull : false
    },
    description : {
        type : Sequelize.TEXT,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false
    },
    cnpj : {
        type : Sequelize.STRING,
        allowNull: false
    }
})

Category.hasMany(Company); //ONE Category has MANY Articles.
Company.belongsTo(Category); //ONE Article belongs to ONE Category

//Company.sync({ force : false })

module.exports = Company;