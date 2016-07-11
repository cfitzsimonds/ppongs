import {Link} from 'react-router';
import GlobalUserList from '../users/GlobalUserList';
import {connect} from 'react-redux';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import * as gameActions from '../../actions/gameActions';
import * as userActions from '../../actions/userActions';
import toastr from 'toastr';

class HomePage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.render = this.render.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

    firebase.database().ref('dinos/').once('value', function(el){
      let temp = {};
      let k = '';
      for (var x in el.val()){
        temp[x] = el.val()[x];
        k = x;
      }

        temp[k]['away'] = 0;
        temp[k]['home'] = 0;
        firebase.database().ref('dinos/').update(temp);

      })

    this.state = {
      //in use manage course form he recommends changing this
      users: Object.assign({}, this.props.users),
      home: 0,
      away: 0,
      game: JSON.parse(localStorage.getItem("game"))
    };
    this.saveGame = this.saveGame.bind(this);

  }

  testasdf(){
    {firebase.database().ref("dinos").on("child_changed", function(snapshot){
     console.log(snapshot.val());
    })
    }
  }
  homeup (){
    this.setState({home: this.state.home +1}) ;

  }
  saveGame(){
    let game = this.state.game;
    this.setState({saving: true});
    if ((game.scores.left === game.scores.right)) {
      game.winner = "Neither";
    } else {
      game.winner = (parseInt(game.scores.left) >
                    parseInt(game.scores.right)) ?
        "Left" : "Right";
      game.winner_id = (parseInt(game.scores.left) >
                        parseInt(game.scores.right)) ?
      game.player_names.player_l_1 +" "+ game.player_names.player_l_2 : game.player_names.player_r_1 +" "+ game.player_names.player_r_2;
      game.loser_id = (parseInt(game.scores.left) < parseInt(game.scores.right)) ?
      game.player_names.player_l_1 +" "+ game.player_names.player_l_2 : game.player_names.player_r_1 +" "+ game.player_names.player_r_2;
    }
    game.confirmed = 0;
    game.id = (new Date()).getTime();
    //let scorecomp = 1;
    //if error here persists, refer to dispatch create andupdate -- Fix was to add bind of this context

    //this.setState({game:game});
    this.props.actions.saveGame(game)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });

  }
  componentDidMount(){

    let t = this.setState;
    t = t.bind(this);
    let sg = this.saveGame;
    sg = sg.bind(this);
    let game = this.state.game;
    console.log(game)
    firebase.database().ref("dinos").on("child_changed", function(snapshot){

      let h = snapshot.val().home;
      let a = snapshot.val().away;
      if (h > 21 || a > 21){
        return false;
      }
      t({home: h, away: a});
      game.scores.left = h;
      game.scores.right = a;
      if (h == 21 || a == 21){
        console.log("game over")
        sg();
      }
    })
  }
  awayup(){
    this.setState({away: this.state.away +1}) ;
  }
  redirect() {
    this.setState({saving: false});

    let thisgame = this.state.game;
    console.log(thisgame);
    let temp = uidLookup(thisgame.player_names.player_r_1, this.props.users);
    temp.confirmations += 1;

    temp.confirmlist.push(thisgame.id.toString());
    this.props.useractions.saveUser(temp).catch(error => {
      toastr.error(error);
      this.setState({saving: false});
    });


    //let x = emailjs.send("default_service","template_qdW3Lfz6",{recipient: temp.email, to_name: temp.displayName, secret: "5"});
    /// does in fact return a promise.  Considering using a prompt to send this to everyone, then making them all add a number up or something
    // Elo stuff

    toastr.success('Game saved');
    //this.context.router.push('/games');

  }
  render() {
    //console.log(JSON.parse(localStorage.getItem('user')));

    let login = ((JSON.parse(localStorage.getItem('user'))).uid);
    let homenum = 0;
    let awaynum = 0;
 //   this.homeup();
 //   this.awayup();
    return (

      <div className="jumbotron">
      <h1>Live Score Feed</h1>
      <table className="table" id="bigT">
        <thead>
        <tr>
          <th><h2>Home</h2></th>
          <th><h2>Away</h2></th>

        </tr>
        </thead>
        <tbody>
        <tr>
          <td><h2>{this.state.home}</h2></td>
          <td><h2>{this.state.away}</h2></td>
        </tr>
        </tbody>
      </table>
	     </div>
    );

  }
}

function mapStateToProps(state, ownProps){
  const gameId = ownProps.params.id;
  let user = (JSON.parse(localStorage.getItem('user')));
  let game ={
    "game_type" : "",
    "id" : "",
    "league_name" : "nd",
    "player_names" : {
      "player_l_1" : "",
      "player_l_2" : "",
      "player_r_1" : "",
      "player_r_2" : ""
    },
    "scores" : {
      "left" : "",
      "right" : ""
    },
    "winner" : "",
    "winner_id": "",
    "loser_id": ""};

  if (gameId && state.games.length > 0){
    game = getGameById(state.games, gameId);
  }

  const authorsFormattedForDropdown = state.users.map(author => {
    return {
      value: author.uid,
      text: author.displayName,
      leagues: author.leagues
    };
  });

  return {
    game: game,
    authors: authorsFormattedForDropdown,
    users: state.users,
    user: user,
    home: 0,
    away: 0
  };
}
function mapDispatchToProps(dispatch) {

  return {
    actions: bindActionCreators(gameActions, dispatch),
    useractions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

function uidLookup(uid, users){
  for(var x in users){
    if (users[x].uid === uid){
      return users[x];
    }
  }
  return false;
}
