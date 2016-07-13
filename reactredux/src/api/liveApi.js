class LiveApi {
  static saveLive(game) {
    game = Object.assign({}, game); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {

      // Simulate server-side validation
      const minGameTitleLength = 1;

        //update
        firebase.database().ref("live").orderByChild("name").on("child_added", function(snapshot) {
          if(snapshot.val().name == game.name) {
            let x = {};
            x[snapshot.getKey()] = game;
            firebase.database().ref("live").update(x);
          }
        });



      resolve(game);
    });
  }

  static getAllLives() {
    return new Promise((resolve,  reject) => {
      firebase.database().ref("live/").on('value', function (data) {
        //console.log(data.val());
        let v = [];
        for (var key in data.val())
        {
          v.push(data.val()[key]);
        }
        resolve(v);

      }.bind(this));

    });
  }

}



export default LiveApi;
