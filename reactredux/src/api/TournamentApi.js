class TournamentApi {


  static saveTournament(tournament) {
    //tournament = Object.assign({}, tournament); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      TournamentApi.getAllTournaments().then((tournaments) => {
        var inside = false;
        for (var i in tournaments){
          if(tournaments[i].uid == tournament.uid){
            firebase.database().ref("tournaments").orderByChild("uid").on("child_added", function(snapshot) {
              if (snapshot.val().uid === tournament.uid) {
                let x = snapshot.val();
                for (var thing in tournament){
                  x[thing] = (tournament[thing] || x[thing])
                }
                //x.email = tournament.email;
                //x.proPic = tournament.proPic;
                //x.displayName = tournament.displayName;
                let y = {};
                y[snapshot.getKey()] = x;
                firebase.database().ref("tournaments").update(y);
              }
            });
            inside = true;
          }
        }
        if( !inside){
          

          firebase.database().ref("tournaments/").push(tournament);
          localStorage.setItem('tournament', JSON.stringify(tournament));
        }


        // add
        //Just simulating creation here.
        //The server would generate ids and watchHref's for new courses in a real app.
        //Cloning so copy returned is passed by value rather than by reference.

        //game.watchHref = `http://www.pluralsight.com/courses/${course.id}`;



      /*if (tournament.id) {
        //update
        firebase.database().ref("tournaments").orderByChild("id").on("child_added", function(snapshot) {
          if(snapshot.val().id === tournament.id) {
       let x = {};
       x[snapshot.getKey()] = tournament;
       firebase.database().ref("tournaments").update(x);
       }
        });

      } else {
        // add
        //Just simulating creation here.
        //The server would generate ids and watchHref's for new courses in a real app.
        //Cloning so copy returned is passed by value rather than by reference.

        //game.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
        firebase.database().ref("tournaments/").push(tournament);

      }*/

      resolve(tournament);
    });
    })
  }

  static getAllTournaments() {
    return new Promise((resolve,  reject) => {
      firebase.database().ref("tournaments/").on('value', function (data) {
        //console.log(firebase.auth().currentTournament);
        let v = [];
        for (var key in data.val())
        {

          v.push(data.val()[key]);

        }
        localStorage.setItem('tournaments', JSON.stringify((((v)))));

        resolve(v);

      }.bind(this));

    });
  }

}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default TournamentApi;
