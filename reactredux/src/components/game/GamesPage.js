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
        <GameList games={games}/>
      </div>
    );
  }
}

GamesPage.propTypes = {
  games: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps){
  return {
    games: state.games
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
