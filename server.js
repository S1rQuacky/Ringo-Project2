//Dependencies
require('dotenv').config()
const express = require('express');
const methodOverride = require('method-override');
const MovieRouter = require("./controllers/spooky");
const UserRouter = require("./controllers/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();

//Port
//Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;


//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
app.use(session({
  secret: process.env.SECRET,
  store: MongoStore.create({mongoUrl: process.env.MONGODB_URI}),
  saveUninitialized: true,
  resave: false,
}))

app.use("/spooktober", MovieRouter)
app.use("/user", UserRouter)

app.get("/", (req, res) => {
  res.render("index.ejs")
});



//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('express is listening on:', PORT));


//Moved to /models/connection.js
//_________________________________
//Database
// How to connect to the database either via heroku or locally


// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version


// Error / success

//__________________
//Models

//_____________________________________
//Items moved to /controllers/spooky.js
//_______________________________________:__
//___________________
// Routes
//___________________
//localhost:3000

//SEED
///____Need to change data output & resolve poster url not displaying