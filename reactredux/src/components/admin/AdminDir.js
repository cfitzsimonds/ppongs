import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../../actions/gameActions';
import * as userActions from '../../actions/userActions';
import toastr from 'toastr';


import ConfirmGameList from './ConfirmGameList';
import {browserHistory} from 'react-router';

class ConfirmGamesPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      user : this.props.user
    };
    this.saveGame = this.saveGame.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.denyGame = this.denyGame.bind(this);
    this.denyUser = this.denyUser.bind(this);
    this.redirectToAddGamePage = this.redirectToAddGamePage.bind(this);
    this.render = this.render.bind(this);
  }

  gameRow(game, index){
    return <div key={index}>hello</div>;
  }

  redirectToAddGamePage(){
    browserHistory.push('/game');
  }
  getElo(user){
    return (user.elo || 0);
  }
  saveGame(event){
    event.preventDefault();
    //
    //Change this to selector with find by id and with taking in e.target.name
    let game = getGameById(this.props.games, this.props.user.confirmlist[event.target.name]);
    this.setState({saving: true});
    this.setState({game: game});

    game.confirmed = 1;

    //let scorecomp = 1;
    //if error here persists, refer to dispatch create andupdate -- Fix was to add bind of this context

    //this.setState({game:game});
    this.props.gameActions.saveGame(game)
      .then(() => this.saveUser())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });

  }
  saveUser() {
    this.setState({saving: false});
    let thisgame = this.state.game;
    let temp = uidLookup(thisgame.player_names.player_r_1, this.props.users);



    //let x = emailjs.send("default_service","template_qdW3Lfz6",{recipient: temp.email, to_name: temp.displayName, secret: "5"});
    /// does in fact return a promise.  Considering using a prompt to send this to everyone, then making them all add a number up or something
    // Elo stuff
    let l_elos = (this.props.users).filter(function (el) {

      for (var i in thisgame.player_names){
        if (thisgame.player_names[i] === el.uid && i[7] === "l"){
          return true;
        }
      }
      return false;
    }.bind(this)).map(this.getElo);
    let r_elos = (this.props.users).filter(function (el) {
      for (var i in thisgame.player_names){
        if (thisgame.player_names[i] === el.uid && i[7] === "r"){
          return true;
        }
      }
      return false;
    }.bind(this)).map(this.getElo);
    let r = [Math.pow(10,(l_elos.reduce(function(a, b){
        return (a + b )/((b>0)? 2:1)
      }))/400), Math.pow(10,(r_elos.reduce(function(a, b){
        return (a + b )/((b>0)? 2:1)
      }))/400)];

    let e = [r[0]/(r[1]+r[0]),r[1]/(r[1]+r[0]) ]
    let k = 30 + Math.abs(thisgame.scores.left - thisgame.scores.right)/5;
    let s = [];
    let leftwinner = 1;
    let rightwinner = 1;
    let draw = 1;
    let matchtype = "";



    //this.props.useractions.saveUser()
    if (thisgame.game_type == 2){
      matchtype = "doubles";
    } else {
      matchtype = "singles";

    }

    console.log("game type =" + matchtype)

    if(thisgame.winner === "Right"){
      leftwinner = 0;
      rightwinner = 1;
      draw = 0;
      s = [0, 1];
    } else if (thisgame.winner === "Left"){
      leftwinner = 1;
      rightwinner = 0;
      draw = 0;
      s = [1, 0];
    } else {
      leftwinner = 0;
      rightwinner = 0;
      draw = 1;
      s = [.5, .5];
    }



    for (var i in thisgame.player_names){
      temp = uidLookup(thisgame.player_names[i], this.props.users);
      if(temp == false){
        continue;
      }

      temp.statistics.games_played[matchtype] += 1;
      temp.league_stats[thisgame.league_name].games_played += 1;

      if(i.indexOf("2") > -1 && matchtype === "singles"){
        continue;
      }
      if(i[7] === "r" ){
        if(i[9] == "1"){
          temp.confirmations -= 1;
          temp.confirmlist.splice(temp.confirmlist.indexOf(thisgame.id),1);
        }
        temp.statistics.wins[matchtype] += rightwinner;
        temp.statistics.losses[matchtype] += leftwinner;
        temp.statistics.draws[matchtype] += draw;
        temp.league_stats[thisgame.league_name].wins += rightwinner;
        temp.league_stats[thisgame.league_name].losses += leftwinner;
        temp.league_stats[thisgame.league_name].draws += draw;
        temp.elo += Math.round(k * (s[1]- e[1]));
      } else {
        temp.statistics.wins[matchtype] += leftwinner;
        temp.statistics.losses[matchtype] += rightwinner;
        temp.statistics.draws[matchtype] += draw;
        temp.league_stats[thisgame.league_name].wins += leftwinner;
        temp.league_stats[thisgame.league_name].losses += rightwinner;
        temp.league_stats[thisgame.league_name].draws += draw;
        temp.elo += Math.round(k * (s[0]- e[0]));
      }
      this.props.userActions.saveUser(temp).catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
    }




      toastr.success('Game saved');
      //this.context.router.push('/games');


  }

  denyGame(event){
    event.preventDefault();
    //
    //Change this to selector with find by id and with taking in e.target.name
    let game = getGameById(this.props.games, this.props.user.confirmlist[event.target.name]);
    this.setState({saving: true});
    this.setState({game: game});

    game.confirmed = -1;

    //let scorecomp = 1;
    //if error here persists, refer to dispatch create andupdate -- Fix was to add bind of this context

    //this.setState({game:game});
    this.props.gameActions.saveGame(game)
      .then(() => this.denyUser())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });

  }

  denyUser(){
    this.setState({saving: false});
    let thisgame = this.state.game;
    let temp = uidLookup(thisgame.player_names.player_r_1, this.props.users);


    temp.confirmations -= 1;


    temp.confirmlist.splice(temp.confirmlist.indexOf(thisgame.id),1);

      this.props.userActions.saveUser(temp).catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });





    toastr.success('Game saved');
    //this.context.router.push('/games');


  }

  render() {

    const {games} = this.props;

    let user = this.props.user|| {leagues: []};
    let users = this.props.users ;
    return (
      <div>
        <h1>Confirmations</h1>

        {user.leagues.map(function(el){
          return (<div key={el.value}><h3>{el.text}</h3>
            <ConfirmGameList  currentUser={this.props.user} games={user.confirmlist.slice(1).map(function(els){
              return (getGameById(this.props.games, els));
            }.bind(this))} users={users} league={el.value}
            confirm={this.saveGame}
                              deny={this.denyGame}
            /></div>)
        }.bind(this))}

      </div>
    );
  }
}

ConfirmGamesPage.propTypes = {
  games: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  user: PropTypes.object
};

function mapStateToProps(state, ownProps){
  let user = findUser(state.users, (JSON.parse(localStorage.getItem('user'))).uid);

  return {
    games: state.games,
    users: state.users,
    user: user
  };
}

////
function mapDispatchToProps(dispatch) {
  return {
    gameActions: bindActionCreators(gameActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmGamesPage);
// can define a mapDispatchToProps but is automatically replaced by dispatch atm
function findUser(userlist, id){
  for (var i in userlist){
    if (userlist[i].uid === id){
      return userlist[i]
    }
  }
}
function getGameById(games, id) {
  const game = games.filter(game => game.id == id);
  if (game.length) return game[0];
  return null;
}
function uidLookup(uid, users){
  for(var x in users){
    if (users[x].uid === uid){
      return users[x];
    }
  }
  return false;
}
