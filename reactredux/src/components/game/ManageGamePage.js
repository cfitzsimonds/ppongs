import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../../actions/gameActions';
import GameForm from './GameForm';
import toastr from 'toastr';

class ManageGamePage extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      //in use manage course form he recommends changing this
      game: Object.assign({}, this.props.game),
      errors: {},
      saving: false
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
    if ((this.state.game.scores.left === this.state.game.scores.right)) {
      game.winner = "Neither";
    } else {
      game.winner = (this.state.game.scores.left > this.state.game.scores.right) ?
        "Left" : "Right";
    }


    return this.setState({game: game});
  }

  saveGame(event){
    event.preventDefault();
    this.setState({saving: true});

    //let scorecomp = 1;
    //if error here persists, refer to dispatch create andupdate -- Fix was to add bind of this context
    
    //this.setState({game:game});
    this.props.actions.saveGame(this.state.game)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });

  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Game saved');
    this.context.router.push('/games');
  }

  render(){
    return (
      <GameForm
        allPlayers={this.props.authors}
        onChange={this.updateGameState}
        onSave={this.saveGame}
        game={this.state.game}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageGamePage.propTypes = {
  game: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
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
    "winner" : ""};

  if (gameId && state.games.length > 0){
    game = getGameById(state.games, gameId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    game: game,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {

  return {
    actions: bindActionCreators(gameActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageGamePage);
