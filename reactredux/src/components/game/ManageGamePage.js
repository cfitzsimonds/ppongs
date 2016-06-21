import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../../actions/gameActions';
import * as userActions from '../../actions/userActions';
import GameForm from './GameForm';
import toastr from 'toastr';

class ManageGamePage extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      //in use manage course form he recommends changing this
      game: Object.assign({}, this.props.game),
      errors: {},
      saving: false,
      user: Object.assign({}, this.props.user)
    };

    this.updateGameState = this.updateGameState.bind(this);
    this.saveGame = this.saveGame.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if ( this.props.game.id != nextProps.game.id) {
      // handles refresh, runs anytime it thinks props might have chagned
      this.setState({game: Object.assign({}, nextProps.game)});
    }
  }

  updateGameState(event) {
    let game = this.state.game;
    const field = event.target.name;
    if ( field.indexOf('.') > -1){
      let temp = [];
      temp = field.split(".");
      game[temp[0]][temp[1]] = event.target.value;
    }else {
      game[field] = event.target.value;
    }
    /*
    if ((this.state.game.scores.left === this.state.game.scores.right)) {
      game.winner = "Neither";
    } else {
      game.winner = (this.state.game.scores.left > this.state.game.scores.right) ?
        "Left" : "Right";
      game.winner_id = (this.state.game.scores.left > this.state.game.scores.right) ?
        game.player_names.player_l_1 +" "+ game.player_names.player_l_2 : game.player_names.player_r_1 +" "+ game.player_names.player_r_2;
      game.loser_id = (this.state.game.scores.left < this.state.game.scores.right) ?
      game.player_names.player_l_1 +" "+ game.player_names.player_l_2 : game.player_names.player_r_1 +" "+ game.player_names.player_r_2;
    }*/


    return this.setState({game: game});
  }

  saveGame(event){
    event.preventDefault();
    let game = this.state.game;
    this.setState({saving: true});
    if ((game.scores.left === game.scores.right)) {
      game.winner = "Neither";
    } else {
      game.winner = (parseInt(game.scores.left) > parseInt(game.scores.right)) ?
        "Left" : "Right";
      game.winner_id = (parseInt(game.scores.left) > parseInt(game.scores.right)) ?
      game.player_names.player_l_1 +" "+ game.player_names.player_l_2 : game.player_names.player_r_1 +" "+ game.player_names.player_r_2;
      game.loser_id = (parseInt(game.scores.left) < parseInt(game.scores.right)) ?
      game.player_names.player_l_1 +" "+ game.player_names.player_l_2 : game.player_names.player_r_1 +" "+ game.player_names.player_r_2;
    }
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

  redirect() {
    this.setState({saving: false});
    let thisgame = this.state.game;
    let temp = uidLookup(thisgame.player_names.player_l_1, this.props.users);
    let leftwinner = 1;
    let rightwinner = 1;
    let draw = 1;
    let matchtype = "";

    //this.props.useractions.saveUser()
    if (thisgame.game_type === 2){
      matchtype = "doubles";
    } else {
      matchtype = "singles";

    }
    if(thisgame.winner === "Right"){
      leftwinner = 0;
      rightwinner = 1;
      draw = 0;
    } else if (thisgame.winner === "Left"){
      leftwinner = 1;
      rightwinner = 0;
      draw = 0;
    } else {
      leftwinner = 0;
      rightwinner = 0;
      draw = 1;
    }

    for (var i in thisgame.player_names){
      temp = uidLookup(thisgame.player_names[i], this.props.users);
      if(temp == false){
        continue;
      }
      temp.statistics.games_played[matchtype] += 1;
      if(i.indexOf("2") > -1 && matchtype === "singles"){
        continue;
      }
      if(i[7] === "r" ){
        temp.statistics.wins[matchtype] += rightwinner;
        temp.statistics.losses[matchtype] += leftwinner;
        temp.statistics.draws[matchtype] += draw;
      } else {
        temp.statistics.wins[matchtype] += leftwinner;
        temp.statistics.losses[matchtype] += rightwinner;
        temp.statistics.draws[matchtype] += draw;
      }
      this.props.useractions.saveUser(temp).catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
    }


    toastr.success('Game saved');
    this.context.router.push('/games');

  }

  render(){
    console.log(this.state.user)
    return (
      <GameForm
        allPlayers={this.props.authors}
        onChange={this.updateGameState}
        onSave={this.saveGame}
        game={this.state.game}
        errors={this.state.errors}
        saving={this.state.saving}
        currentPlayer={this.state.user}
      />
    );
  }
}

ManageGamePage.propTypes = {
  game: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  user: PropTypes.object
};

ManageGamePage.contextTypes = {
  router: PropTypes.object
};

function getGameById(games, id) {
  const game = games.filter(game => game.id == id);
  if (game.length) return game[0];
  return null;
}

// one day inspect ownProps
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
  console.log(user)

  return {
    game: game,
    authors: authorsFormattedForDropdown,
    users: state.users,
    user: user
  };
}

function mapDispatchToProps(dispatch) {

  return {
    actions: bindActionCreators(gameActions, dispatch),
    useractions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageGamePage);
function getUserById(users, id) {
  const user = users.filter(user => user.uid == id);
  if (user.length) return user[0];
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
