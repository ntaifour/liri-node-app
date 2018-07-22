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

function getTweets(){
  // var to pull in API key from keys file
  var client = new twitter(keys.twitter);

  var params = {screen_name: 'backrowcoders', count: 20};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for(var i = 0; i<tweets.length; i++){
        var date = tweets[i].created_at;
        console.log(tweets[i].text);
        console.log("-----------------------------------------------");
      }
    };
  });
};


function getSong(songTitle){
  // var to pull in API key from keys file
  var spotify = new Spotify(keys.spotify);
 
  // request taken in after command when user types in 'node liri.js [userCommand] [userRequest]'
  var songTitle = process.argv[3];

  spotify.search({ type: 'track', query: songTitle }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    // pulls the array of info for the first returned track
    var songs = data.tracks.items[0];

    // Console log Spotify
    console.log("artist(s): " + songs.artists[0].name);
    console.log("Song Title: " + songs.name);
    console.log("Preview Song: " + songs.preview_url);
    console.log("Album: " + songs.album.name);
    console.log("-----------------------------------------------");

  });
};



