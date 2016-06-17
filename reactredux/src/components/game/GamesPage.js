import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../../actions/gameActions';
import GameList from './GameList';
import {browserHistory} from 'react-router';

class GamesPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.redirectToAddGamePage = this.redirectToAddGamePage.bind(this);
    this.render = this.render.bind(this);
  }

  gameRow(game, index){
    return <div key={index}>hello</div>;
  }

  redirectToAddGamePage(){
    browserHistory.push('/game');
  }

  render() {
    const {games} = this.props;
    return (
      <div>
        <h1>Games</h1>
        <input type="submit"
               value="Add Game"
               className="btn btn-primary"
               onClick={this.redirectToAddGamePage}

        />
        <GameList games={games} users={this.props.users}/>
      </div>
    );
  }
}

GamesPage.propTypes = {
  games: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps){
  //console.log(state);
  return {
    games: state.games,
    users: state.users
  };
}

////
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(gameActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesPage);
// can define a mapDispatchToProps but is automatically replaced by dispatch atm
