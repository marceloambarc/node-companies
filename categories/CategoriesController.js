const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

router.get("/private/categories", (req,res) => {
    Category.findAll().then(categories => {
        res.render("private/categories/index",{
            categories : categories
        });
    });
});

router.get("/private/categories/new",(req,res) => {
    res.render("private/categories/new");
});

router.post("/categories/save", (req, res) => {
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title : title,
            slug : slugify(title, {
                lower : true
            })
        }).then(() => {
            res.redirect("/private/categories")
        })
    }else{
        res.redirect("private/categories/new");
    }
});

router.post("/categories/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined) {
        if(!isNaN(id)){
            Category.destroy({
                where : {
                    id : id
                }
            }).then(() => {
                res.redirect("/private/categories");
            })
        }else{
            res.redirect("/private/categories");//NOT a Number
        }
    }else{
        res.redirect("/private/categories");//NULL
    }
});

router.get("/private/categories/edit/:id", (req,res) => {
    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("/private/categories");
    }
    Category.findByPk(id).then(category => {
        if(category != undefined){
            res.render("private/categories/edit",{ category : category });
        }else{
            res.redirect("/private/categories");
        }
    }).catch(erro => {
        res.redirect("/private/categories");
    })
});

router.post("/categories/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    Category.update({ title : title, slug : slugify(title, {
        lower : true
    }) },{
        where : {
            id : id
        }
    }).then(() => {
        res.redirect("/private/categories");
    })
});

module.exports = router;