const express = require("express");
const MovieModel = require("../models/spooky")
const moment = require('moment')

const router = express.Router()

//Router Middleware
router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect("/user/login");
    }
});

//Routes


  router.get("/seed", (req, res) => {
    const mustWatch = [
      {title: "Hocus Pocus", overview: "Max accidentally frees a coven of evil witches, with the help of a magical cat, the kids must steal the witches' book of spells to stop them from becoming immortal.", released:"1993-07-16", myRating: 10, myNotes: "Must watch!", poster: "https://lumiere-a.akamaihd.net/v1/images/p_hocuspocus_19880_e000b013.jpeg?region=0%2C0%2C540%2C810" },
      {title: "Zombievers", overview:"College friends find their weekend of sex and debauchery ruined when deadly zombie beavers swarm their riverside cabin.", released:"2014-04-13", myRating: 7, myNotes: "Unique idea, perfect ending", poster:"http://gruesome.decadesofhorror.com/wp-content/uploads/sites/6/2015/10/image1.jpeg"},
      {title: "IT", overview: "In 1960, seven preteen outcasts fight an evil demon that poses as a child-killing clown. Thirty years later, they reunite to stop the demon once and for all when it returns to their hometown.",  released: "1990-11-18", myRating: 8.5, myNotes: "Story is creepy, actor is great, graphics meh, book is amazing", poster:"https://m.media-amazon.com/images/M/MV5BYjg1YTRkNzQtODgyYi00MTQ5LThiMDYtNDJjMWRjNTdjZDZlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg"}
    ]
    MovieModel.remove({}, (err, data) => {
      MovieModel.create(mustWatch, (err, data) => {
        res.json(data);
      });
    });
  });
  
  //Index
  router.get("/", (req, res) => {
    MovieModel.find({username: req.session.username}, (err, flicks) => {
      res.render("spooktober/index.ejs", {flicks});
    });
  });
  
  //New
  router.get("/new", (req, res) => {
    res.render("spooktober/new.ejs")
  });
  
  //Create
  router.post("/", (req, res) => {
      req.body.username = req.session.username
    MovieModel.create(req.body, (err, movie) => {
      res.redirect("/spooktober")
    });
  });
  
  //Edti
  router.get("/:id/edit", (req, res) => {
    const id = req.params.id
    MovieModel.findById(id, (err, movie) => {
      res.render("spooktober/edit.ejs", {movie})
    });
  });
  
  //Update
  router.put("/:id", (req, res) => {
    const id = req.params.id
    MovieModel.findByIdAndUpdate(id, req.body, {new: true}, (err, movie) => {
      res.redirect("/spooktober")
    });
  });
  
  //Delete
  router.delete("/:id", (req, res) => {
    const id = req.params.id
    MovieModel.findByIdAndRemove(id, (err, movie) => {
      res.redirect("/spooktober")
    });
  });
  
  //Show
  router.get("/:id", (req, res) => {
    const id = req.params.id
    MovieModel.findById(id, (err, movie) => {
      res.render("spooktober/show.ejs", {movie, moment: moment})
    });
  });




module.exports = router;