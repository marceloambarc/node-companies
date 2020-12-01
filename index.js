const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const companiesController = require("./companies/CompaniesController");
const usersController = require("./users/UsersController");

const Article = require("./companies/Company");
const Category = require("./categories/Category");
const User = require("./users/User");
const Company = require("./companies/Company");

// View engine
app.set('view engine','ejs');

// Sessions
app.use(session({
    secret : "delgrano",
    resave: false,
    saveUninitialized: true,
    cookie : { maxAge: 3000000 }
}));

// Static
app.use(express.static('public'));

// Body parser
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

// Database Config
connection
    .authenticate()
    .then(() => {
        console.log("Conection with database success!")
    }).catch((error) => {
        console.log(error);
    })

app.use("/", categoriesController);
app.use("/", companiesController);
app.use("/", usersController);

app.get("/",(req,res) => {
    Company.findAll({
        order : [
            ['id','DESC']
        ],
        limit: 4
    }).then(companies => {
        Category.findAll().then(categories => {
            res.render("index", { companies : companies, categories : categories });
        });
    });
})

app.get("/:slug",(req,res) => {
    var slug = req.params.slug;
    Company.findOne({
        where : {
            slug : slug
        }
    }).then(company => {
        if(company != undefined){
            Category.findAll().then(categories => {
                res.render("company", { company : company, categories : categories });
            });
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })
});

app.get("/category/:slug",(req,res) => {
    var slug = req.params.slug;
    Category.findOne({
        where : {
            slug : slug
        },
        include : [{ model : Company }]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render("index",{ companies: category.companies, categories : categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })
});

app.listen(8080, () => {
    console.log("Server ON!");
})