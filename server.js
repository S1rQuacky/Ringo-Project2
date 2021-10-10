require('dotenv').config()

//Dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;

//Port
//Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//Database
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true }
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));

//__________________
//Models
//__________________
const {Schema, model} = mongoose

const movieSchema = new Schema({
  title: String,
  overview: String,
  released: Date,
  myRating: Number,
  myNotes: String,
  poster: {data: Buffer, contentType: String}, 
})
const MovieModel = model("Movie", movieSchema)
//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World!');
});
//SEED
///____Need to change data output & resolve poster url not displaying
app.get("/spooktober/seed", (req, res) => {
  const mustWatch = [
    {title: "Hocus Pocus", overview: "Max accidentally frees a coven of evil witches, with the help of a magical cat, the kids must steal the witches' book of spells to stop them from becoming immortal.", released:"1993-07-16", myRating: 10, myNotes: "Must watch!", poster: "https://lumiere-a.akamaihd.net/v1/images/p_hocuspocus_19880_e000b013.jpeg?region=0%2C0%2C540%2C810" },
    {title: "Zombievers", overview:"College friends find their weekend of sex and debauchery ruined when deadly zombie beavers swarm their riverside cabin.", release:"2014-04-13", myRating: 7, myNotes: "Unique idea, perfect ending", poster:"http://gruesome.decadesofhorror.com/wp-content/uploads/sites/6/2015/10/image1.jpeg"},
    {title: "IT", overview: "In 1960, seven preteen outcasts fight an evil demon that poses as a child-killing clown. Thirty years later, they reunite to stop the demon once and for all when it returns to their hometown.",  release: "1990-11-18", myRating: 8.5, myNotes: "Story is creepy, actor is great, graphics meh, book is amazing", poster:"https://m.media-amazon.com/images/M/MV5BYjg1YTRkNzQtODgyYi00MTQ5LThiMDYtNDJjMWRjNTdjZDZlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg"}
  ]
  MovieModel.remove({}, (err, data) => {
    MovieModel.create(mustWatch, (err, data) => {
      res.json(data);
    });
  });
});

app.get("/spooktober", (req, res) => {
  MovieModel.find({}, (err, flicks) => {
    res.render("spooktober/index.ejs", {flicks});
  });
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('express is listening on:', PORT));