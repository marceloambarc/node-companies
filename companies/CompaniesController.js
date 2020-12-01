const express = require("express");
const router = express.Router();
const Category = require("../categories/Category")
const Company = require("./Company");
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");

router.get("/private/companies", adminAuth,(req,res) => {
    Company.findAll({
        include : [{ model : Category }]
    }).then(companies => {
        res.render("private/companies/index",{companies : companies})
    });
});

router.get("/private/companies/new", adminAuth, (req,res) => {
    Category.findAll().then(categories => {
        res.render("private/companies/new",{ categories : categories })
    })
});

router.post("/companies/save", adminAuth, (req,res) => {
    var name = req.body.name;
    var description = req.body.description;
    var email = req.body.email;
    var cnpj = req.body.cnpj;
    var category = req.body.category;

    Company.create({
        name : name,
        slug : slugify(name),
        description : description,
        email : email,
        cnpj : cnpj,
        categoryId : category
    }).then(() => {
        res.redirect("/private/companies");
    });
});

router.post("/companies/delete", adminAuth, (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Company.destroy({
                where : {
                    id : id
                }
            }).then(() => {
                res.redirect("/private/companies");
            });
        }else{
            res.redirect("/private/companies");
        }
    }else{
        res.redirect("/private/companies");
    }
});

router.get("/private/companies/edit/:id", adminAuth, (req,res) => {
    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("/private/companies");
    }
    Company.findByPk(id).then(company => {
        if(company != undefined){
            Category.findAll().then(categories => {
                res.render("private/companies/edit",{ company : company, categories : categories });
            })
        }else{
            res.redirect("/private/companies");
        }
    }).catch(err => {
        res.redirect("/private/companies");
    })
});

router.post("/companies/update", adminAuth, (req,res) =>{
    var id = req.body.id;
    var name = req.body.name;
    var body = req.body.body;
    var category = req.body.category;

    Company.update({name: name, body: body, categoryId: category, slug: slugify(title)},{
        where: {
            id : id
        }
    }).then(() => {
        res.redirect("/private/companies");
    }).then(err => {
        res.redirect("/");
    });
});

router.get("/companies/page/:num",(req,res) => {
    var page = req.params.num;
    var offset = 0;
    
    if(isNaN(page) || page == 1){
        offset = 0;
    }else{
        offset = (parseInt(page) - 1) * 4;
    }

    Company.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [
            ['id','DESC']
        ]
    }).then(companies => {
        var next;

        if(offset + 4 >= companies.count){
            next = false;
        }else{
            next = true;
        }

        var result = {
            page: parseInt(page),
            next : next,
            companies : companies,
        }

        Category.findAll().then(categories => {
            res.render("private/companies/page",{result : result, categories : categories})
        });
    })

});

module.exports = router;