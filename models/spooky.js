//Import Dependencies
const mongoose = require("./connection")

//Define Model
const {Schema, model} = mongoose

const movieSchema = new Schema({
  title: String,
  overview: String,
  released: Date,
  myRating: Number,
  myNotes: String,
  poster: String,
  username: String 
})

const MovieModel = model("Movie", movieSchema)

module.exports = MovieModel