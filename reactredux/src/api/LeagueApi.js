class LeagueApi {
  static generateId(league) {
    return (new Date()).getTime();
  }

  static saveLeague(league) {
    league = Object.assign({}, league); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {

      // Simulate server-side validation
      const minLeagueTitleLength = 1;

      // need rejection if any field is not filled
      /*if (league.title.length < minLeagueTitleLength) {
       reject(`Title must be at least ${minLeagueTitleLength} characters.`);
       }*/




      if (league.uid) {
        //update
        firebase.database().ref("leagues").orderByChild("uid").on("child_added", function(snapshot) {
          if(snapshot.val().uid === league.uid) {
            let x = {};
            x[snapshot.getKey()] = league;
            firebase.database().ref("leagues").update(x);
          }
        });

      } else {
        // add
        //Just simulating creation here.
        //The server would generate ids and watchHref's for new courses in a real app.
        //Cloning so copy returned is passed by value rather than by reference.
        league.uid = LeagueApi.generateId(league);
        //league.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
        firebase.database().ref("leagues/").push(league);

      }

      resolve(league);
    });
  }

  static getAllLeagues() {
    console.log("called");
    return new Promise((resolve,  reject) => {
      firebase.database().ref("leagues/").on('value', function (data) {
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

export default LeagueApi;
const league1 = {
  league_type: 1,
  player_names: {
    player_l_1: "Ryan",
    player_l_2: "",
    player_r_1: "Michael",
    player_r_2: ""
  },
  league_id: 1465916389175,
  scores: {
    left: 21,
    right: 1
  },
  winner: "left",
  league_name: "nd"

};
