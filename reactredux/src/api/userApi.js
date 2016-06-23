class UserApi {


  static saveUser(user) {
    //user = Object.assign({}, user); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      UserApi.getAllUsers().then((users) => {
        var inside = false;
        //console.log(user);
        for (var i in users){
          if(users[i].uid == user.uid){
            firebase.database().ref("users").orderByChild("id").on("child_added", function(snapshot) {
              if (snapshot.val().uid === user.uid) {
                let x = snapshot.val();
                for (var thing in user){
                  x[thing] = (user[thing] || x[thing])
                }
                //x.email = user.email;
                //x.proPic = user.proPic;
                //x.displayName = user.displayName;
                let y = {};
                y[snapshot.getKey()] = x;
                firebase.database().ref("users").update(y);
                localStorage.setItem('user', JSON.stringify(y[snapshot.getKey()]));
              }
            });
            inside = true;
          }
        }
        if( !inside){
          user.statistics = {
            wins: {
              singles: 0,
              doubles: 0
            },
            losses: {
              singles: 0,
              doubles: 0
            },
            draws: {
              singles: 0,
              doubles: 0
            },
            games_played: {
              singles: 0,
              doubles: 0
            }
          };
          user.leagues = [{text:"Rightpoint Detroit",value: "1466513558321" }],
          user.elo = 1500;

          firebase.database().ref("users/").push(user);
          localStorage.setItem('user', JSON.stringify(user));
        }


        // add
        //Just simulating creation here.
        //The server would generate ids and watchHref's for new courses in a real app.
        //Cloning so copy returned is passed by value rather than by reference.

        //game.watchHref = `http://www.pluralsight.com/courses/${course.id}`;



      /*if (user.id) {
        //update
        firebase.database().ref("users").orderByChild("id").on("child_added", function(snapshot) {
          if(snapshot.val().id === user.id) {
       let x = {};
       x[snapshot.getKey()] = user;
       firebase.database().ref("users").update(x);
       }
        });

      } else {
        // add
        //Just simulating creation here.
        //The server would generate ids and watchHref's for new courses in a real app.
        //Cloning so copy returned is passed by value rather than by reference.

        //game.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
        firebase.database().ref("users/").push(user);

      }*/

      resolve(user);
    });
    })
  }

  static getAllUsers() {
    return new Promise((resolve,  reject) => {
      firebase.database().ref("users/").on('value', function (data) {
        //console.log(firebase.auth().currentUser);
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

export default UserApi;
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
