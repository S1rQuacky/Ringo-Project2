const mongoose = require("./connection");
const MovieModel = require("./spooky");

//Seed Code

mongoose.connection.on("open", () => {
    const mustWatch = [
        {title: "Hocus Pocus", overview: "Max accidentally frees a coven of evil witches, with the help of a magical cat, the kids must steal the witches' book of spells to stop them from becoming immortal.", released:"1993-07-16", myRating: 10, myNotes: "Must watch!", poster: "https://lumiere-a.akamaihd.net/v1/images/p_hocuspocus_19880_e000b013.jpeg?region=0%2C0%2C540%2C810" },
        {title: "Zombievers", overview:"College friends find their weekend of sex and debauchery ruined when deadly zombie beavers swarm their riverside cabin.", released:"2014-04-13", myRating: 7, myNotes: "Unique idea, perfect ending", poster:"http://gruesome.decadesofhorror.com/wp-content/uploads/sites/6/2015/10/image1.jpeg"},
        {title: "IT", overview: "In 1960, seven preteen outcasts fight an evil demon that poses as a child-killing clown. Thirty years later, they reunite to stop the demon once and for all when it returns to their hometown.",  released: "1990-11-18", myRating: 8.5, myNotes: "Story is creepy, actor is great, graphics meh, book is amazing", poster:"https://m.media-amazon.com/images/M/MV5BYjg1YTRkNzQtODgyYi00MTQ5LThiMDYtNDJjMWRjNTdjZDZlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg"}
      ];
      MovieModel.remove({}, (err, data) => {
          MovieModel.create(mustWatch, (err, data) => {
              console.log("-----------Movie Added----------");
              console.log(data);
              console.log("----------Movie Added------------");
              mongoose.connection.close();
          });
      });
});