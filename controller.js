var firebase = require('firebase');
var config = {
        apiKey: "AIzaSyAvO4rci6SDM5wJ0jIeGoBJw9Wj7mnCCAo",
        authDomain: "project-5457323458366770321.firebaseapp.com",
        databaseURL: "https://project-5457323458366770321.firebaseio.com",
        storageBucket: "",
      };
app = firebase.initializeApp(config);

x = function(stuff){console.log( stuff.val())}

app.database().ref('dinos/').on('child_added', x)