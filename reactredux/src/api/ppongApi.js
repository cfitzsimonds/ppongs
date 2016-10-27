// Api that handles the storage of games

class GameApi {
  static generateId(game) {
    return (new Date()).getTime();
 }

  static saveGame(game) {
    game = Object.assign({}, game); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {

      // Simulate server-side validation
      const minGameTitleLength = 1;

      // need rejection and notification via toaste if any field is not filled



      // validation , requirees all forms be filled before submission

      if(!(game.game_type>0)){
        reject("Must select a valid game type")
      }
      if(!game.league_name){
        reject("Must select a league")
      }
      var x = 0;
      for (var key in game.player_names){
        if(x%2 === 0 ) {
          if (game.player_names[key].length < 1) {
            reject("Must select a player in the first position for each side")
          }
        } else{
          if (game.game_type == 2){
            if (game.player_names[key].length < 1) {
              reject("Must select a player in the second position for each side ")
            }
          }
        }
        x++;
      }
      for (var key in game.scores){
        if (!isNumeric(game.scores[key]) ){
          //console.log(game.scores[key]);
          reject("Score must be a valid number");
        }
      }

      if (game.confirmed == 1) {
        //update
        firebase.database().ref("games").orderByChild("id").on("child_added", function(snapshot) {
          if(snapshot.val().id === game.id) {
            let x = {};
            x[snapshot.getKey()] = game;
            firebase.database().ref("games").update(x);
          }
        });

      } else {
        // add
        //Just simulating creation here.
        //The server would generate ids and watchHref's for new courses in a real app.
        //Cloning so copy returned is passed by value rather than by reference.

        //game.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
        firebase.database().ref("games/").push(game);

      }

      resolve(game);
    });
  }

  static getAllGames() {
    return new Promise((resolve,  reject) => {
      firebase.database().ref("games/").on('value', function (data) {
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

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default GameApi;
const game1 = {
  game_type: 1,
  player_names: {
    player_l_1: "Ryan",
    player_l_2: "",
    player_r_1: "Michael",
    player_r_2: ""
  },
  game_id: 1465916389175,
  scores: {
    left: 21,
    right: 1
  },
  winner: "left",
  league_name: "nd"

};
