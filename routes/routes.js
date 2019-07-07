var db = require("../models");
var cheerio = require("cheerio");
var express = require("express");
var axios = require("axios");

//var router = express.Router();
module.exports = function (app) {

    //Main router functionality
    app.get("/", function (req, res) {
        db.Article.find({}).then(function (dbArticle) {
            var hbsObject = {
                articles: dbArticle
            }
            res.render("index", hbsObject);
        }).catch(function (err) {
            res.json(err);
        });
    });

    //Saved articles
    app.get("/saved", function (req, res) {
        //get saved articles
        db.Article.find({ saved: true }).then(function (dbArticle) {
            var hbsObject = {
                articles: dbArticle
            }
            res.render("saved", hbsObject);
        }).catch(function (err) {
            res.json(err);
        });
    });

    //A route to scrap articles
    app.get("/scrape", function (req, res) {
        // First, we grab the body of the html with axios
        axios.get("https://www.siliconera.com/").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:
            $(".title").each(function (i, element) {

                // Empty array to store our results
                result = {};

                result.link = $(element).find("a").attr("href");
                result.title = $(element).children("a").text().replace(/(\t|\n|)/gm, "");
                result.summary = $(element).parent(".post").find("div.postdescription p").text();
                result.image = $(element).parent(".post").find("img.thumbnail").attr("src");
                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        console.log("err");
                    });
            });
            res.redirect("/");
            
        });
    });

    app.get("/api/articles", function (req, res) {
        // Grab all articles and return as JSON
        db.Article.find({}).then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        });
    });

    app.get("/api/articles/:id", function (req, res) {
        db.Article.findOne({ _id: req.params.id })
            .populate("comment")
            .then(function (dbArticle) {
                res.json(dbArticle);
            }).catch(function (err) {
                res.json(err);
            });
    });

    app.post("/api/articles/:id", function (req, res) {
        db.Comment.create(req.body)
            .then(function (dbComment) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.delete("/api/articles/:id", function (req, res) {
        db.Comment.remove({ _id: req.params.id }).then(function () {
            db.Article.findOneAndUpdate({ comment: req.params.id }, { comment: null }, { new: true }).then(function (dbArticle) {
                res.json(dbArticle);
            }).catch(function (err) {
                res.json(err);
            });
        });
    });

    app.post("/api/articles/save/:id", function (req, res) {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true }, { new: true }).then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        });
    });

    app.post("/api/articles/delete/:id", function (req, res) {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false }, { new: true }).then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        });
    });
}
// Export routes for server.js to use.
//module.exports = router;
