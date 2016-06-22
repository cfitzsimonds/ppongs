import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../../actions/gameActions';
import GameList from './GameList';
import {browserHistory} from 'react-router';

class GamesPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      user : this.props.user
    };

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
    if((JSON.parse(localStorage.getItem('user'))).uid === ''){
      //browserHistory.push('/users');

    }
    const {games} = this.props;
    let user = this.props.user|| {leagues: []};
    let users = this.props.users ;
    return (
      <div>
        <h1>Games</h1>
        <input type="submit"
               value="Add Game"
               className="btn btn-primary"
               onClick={this.redirectToAddGamePage}

        />
        {user.leagues.map(function(el){
          return (<div key={el.value}><h3>{el.text}</h3>
          <GameList  games={games} users={users} league={el.value}/></div>)
        })}

      </div>
    );
  }
}

GamesPage.propTypes = {
  games: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  user: PropTypes.object
};

function mapStateToProps(state, ownProps){
  //console.log(state);
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
    actions: bindActionCreators(gameActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesPage);
// can define a mapDispatchToProps but is automatically replaced by dispatch atm
function findUser(userlist, id){
  for (var i in userlist){
    if (userlist[i].uid === id){
      return userlist[i]
    }
  }
}
