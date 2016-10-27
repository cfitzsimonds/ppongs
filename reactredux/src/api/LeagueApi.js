// api + validation for league creation and access

class LeagueApi {

  // function for generating the id of a game - for scale this should change to be salted to prevent
  // conflict of making two games at once
  static generateId(league) {
    return (new Date()).getTime();
  }

// takes a league and either addds it to the databse or update a league already there
  static saveLeague(league) {
    league = Object.assign({}, league); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {

      // Simulate server-side validation
      const minLeagueTitleLength = 1;

      // need rejection if any field is not filled
      /*if (league.title.length < minLeagueTitleLength) {
       reject(`Title must be at least ${minLeagueTitleLength} characters.`);
       }*/



       // if the user is already assgined, update
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
        //  if not addd= it to the rep

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

  //resolve the list of leagues
  static getAllLeagues() {
    return new Promise((resolve,  reject) => {
      firebase.database().ref("leagues/").on('value', function (data) {
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
