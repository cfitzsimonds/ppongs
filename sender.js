const readline = require('readline');
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

process.stdin.on('keypress', (str, key) => {
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

    if (key.name == 'right'){
      temp[k]['away'] = (temp[k]['away'] || 0) + 1;
      app.database().ref('live/').update(temp);
      console.log('r')
    } else if (key.name == 'left') {
      temp[k]['home'] = (temp[k]['home'] || 0) + 1;
      app.database().ref('live/').update(temp);
      console.log('l')
    }
  })

  //console.log(key)
});
