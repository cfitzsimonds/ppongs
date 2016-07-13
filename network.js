var dash_button = require('node-dash-button');
var readline = require('readline');
var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyAvO4rci6SDM5wJ0jIeGoBJw9Wj7mnCCAo",
  authDomain: "project-5457323458366770321.firebaseapp.com",
  databaseURL: "https://project-5457323458366770321.firebaseio.com",
  storageBucket: "",
};
app = firebase.initializeApp(config);
var name = "1466513558321";
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

var home_up = "08:00:27:54:4c:c1"
var away_up = "2"
var home_down = "3"
var away_down = "4"



var dash = dash_button([home_up, away_up, home_down, away_down]);
dash.on("detected", function(dash_id){
    switch(dash_id){
        case home_up:
            handler('home', 1);
            break;
        case away_up:
            handler('away', 1);
            break;
        case home_down:
            handler('home', -1);
            break;
        case away_down:
            handler('away', -1);
            break;
    }
})


function handler(team, value){
    app.database().ref('live/').once('value', function(el){
        console.log(el.val())
        var temp = {};
        var k = '';
        for (var x in el.val()){
          console.log(x)
          if(el.val()[x]['name'] == name){

            temp[x] = el.val()[x];

            k = x;

          }

        }


          temp[k][team] = (temp[k][team] || 0) + value;
          app.database().ref('live/').update(temp);

      })
}
