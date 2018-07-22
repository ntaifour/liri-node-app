var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys");
var fs = require("fs");
// action taken in when user types in 'node liri.js [userCommand]'
var userCommand = process.argv[2];

// request taken in after command when user types in 'node liri.js [userCommand] [userRequest]'
var userRequest = process.argv[3];


// switch to route to respective function depending on user's input
switch(userCommand){
  // if user types 'my tweets', getTweets function runs
  case "my-tweets":
    getTweets();
    break;
  
  // if user types 'spotify-this-song', getSong function runs
  case "spotify-this-song":
    getSong();
    break;

  // if user types 'movie-this', getMovie function runs
  case "movie-this":
    getMovie();
    break;

  // if user types 'do-what-it-says', defaultRequest function runs
  case "do-what-it-says":
    defaultRequest();
    break;
  
  // instructions for first-time users
  default: 
  console.log(
  "\nType any of the following commands after 'node liri.js':" + 
  "\n  my-tweets" + 
  "\n  spotify-this-song + 'Song Title*' " + 
  "\n  movie-this + 'Movie Title*' " + 
  "\n  do-what-it-says " + 
  "\n" +
  "\n  *Use quotes for multi-word titles!"
  );
  break;
};

// funtion to pull latest tweets
function getTweets() {
  // var to pull in API key from keys file
  var client = new twitter(keys.twitter);

  var params = {screen_name: 'backrowcoders', count: 20};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    for (var i = 0; i < tweets.length; i++) {
      console.log(" ");
      console.log("@backrowcoders:")
      console.log(tweets[i].text);
      console.log(" ");
      console.log(tweets[i].created_at);
      console.log("\n-----------------------------------------------\n");
      } 
  });
};


// function to perform song pull request
function getSong(songTitle) {
  // var to pull in API key from keys file
  var spotify = new Spotify(keys.spotify);
 
  // request taken in after command when user types in 'node liri.js [userCommand] [userRequest]'
  var songTitle = process.argv[3];
  
  if (!songTitle) {
    songTitle = "The Sign";
  };

  spotify.search({ type: 'track', query: songTitle }, function (err, data) {
    if (err) {
      return console.log(err);
    }

    // pulls the array of info for the first returned track
    var songs = data.tracks.items[0];

    // prints Spotify track info
    console.log("Artist(s): " + songs.artists[0].name);
    console.log("Song Title: " + songs.name);
    console.log("Preview URL: " + songs.preview_url);
    console.log("Album: " + songs.album.name);
  });
};


function getMovie(movieTitle) {
  // request taken in after command when user types in 'node liri.js [userCommand] [userRequest]'
  var movieTitle = process.argv[3];

  // Runs a request to the OMDB API with the movie specified.
  var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {
    // If the request is successful...
    if (!error && response.statusCode === 200) {
      
      // Parses the body of the site and recovers movie info.
      var movieInfo = JSON.parse(body);

      var results =
      "\n" +
      "Title: " + movieInfo.Title + 
      "\nYear: " + movieInfo.Year + 
      "\nIMDB Rating: " + movieInfo.Ratings[0].Value + 
      "\nRotten Tomatoes Rating: " + movieInfo.Ratings[1].Value + 
      "\nOrigin Country: " + movieInfo.Country + 
      "\nLanguage: " + movieInfo.Language + 
      "\nPlot: " + movieInfo.Plot + 
      "\nActors: " + movieInfo.Actors;

      console.log(results);
    }
  });
};


function defaultRequest() {
  // To read data from random.txt file
  fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			return console.log(err);
		} else {
      // sets string in file to songTitle variable
      var songTitle = data;
      // runs Spotify function from above
      getSong(songTitle);
    };
  });
};

// working on tying this last function up
function log() {
  this.newLogItem = function(command, response) {
    var command = process.argv[1] && process.argv[2] && process.argv[3];
    var response = console.log("test");
    var logTxt =
      "\nCommand: " +
      "\n" + newLogItem.command +
      "\n-----------------------------------------------\n" +
      "\nResponse: " +
      "\n" + newLogItem.response +
      "\n-----------------------------------------------\n";

    fs.appendFile("log.txt", logTxt, function(err) {
      if (err) throw err;
    });

    newLogItem.getWeather();
  };
};
