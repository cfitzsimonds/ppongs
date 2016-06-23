import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GameList from '../game/GameList';
import {browserHistory} from 'react-router';

class HomePage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      //in use manage course form he recommends changing this
      user: Object.assign({}, this.props.user),
      games: Object.assign({}, this.props.games),
      errors: {},
      saving: false,
      checked: true
    };


  }

  componentWillReceiveProps(nextProps){
    if ( this.props.user.uid != nextProps.user.uid) {
      // handles refresh, runs anytime it thinks props might have chagned
      this.setState({user: Object.assign({}, nextProps.user)});
    }
  }
  handleClick (e) {
    this.setState({checked: e.target.checked});
  };
  render() {
    if((JSON.parse(localStorage.getItem('user'))).uid === ''){
      browserHistory.push('/users');

    }
    console.log(JSON.parse(localStorage.getItem('user')));
    let user =  this.props.user;
    let games = this.props.games;
    var checked;

    return (
      <div >
        <h1 id="centeredimage">{user.displayName}<br />
          <img src={user.proPic} alt={user.displayName} id="rcorners9"/></h1>
        <h2>Elo: {user.elo}</h2>
        <h3>Statistics:</h3>
        <table className="table">
          <thead>
          <tr><th>Singles: </th><th>Doubles: </th></tr>
          </thead>
          <tbody>
          <tr>
            <td>
          <p>
            Wins: {user.statistics.wins.singles}<br />
            Losses: {user.statistics.losses.singles}<br />
            Draws: {user.statistics.draws.singles}<br />
            Games Played: {user.statistics.games_played.singles}
          </p>
            </td>
            <td>
          <p>
            Wins: {user.statistics.wins.doubles}<br />
            Losses: {user.statistics.losses.doubles}<br />
            Draws: {user.statistics.draws.doubles}<br />
            Games Played: {user.statistics.games_played.doubles}
          </p>
            </td>
            </tr>
          </tbody>
        </table>
        <h3>Game History: </h3>
        <GameList games={games} users={this.props.users} uid={user.uid} uid2={(1)? (JSON.parse(localStorage.getItem('user'))).uid : ''}/>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps){
  const userId = ownProps.params.id;
  let user = {
    "displayName" : "",
    "email" : "",
    "leagues" : [ "all" ],
    "proPic" : "",
    "statistics" : {
      "draws" : {
        "doubles" : 0,
        "singles" : 0
      },
      "games_played" : {
        "doubles" : 0,
        "singles" : 0
      },
      "losses" : {
        "doubles" : 0,
        "singles" : 0
      },
      "wins" : {
        "doubles" : 0,
        "singles" : 0
      }
    },
    "uid" : ""
  };

  if (userId && state.users.length > 0){
    user = getUserById(state.users, userId);
  }

  /*const authorsFormattedForDropdown = state.users.map(user => {
    return {
      value: user.uid,
      text: author.firstName + ' ' + author.lastName
    };
  });*/

  return {
    user: user,
    users: state.users,
    games: state.games
  };
}

function getUserById(users, id) {
  const user = users.filter(user => user.uid == id);
  if (user.length) return user[0];
  return null;
}
HomePage.propTypes = {
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  games: PropTypes.array.isRequired
};
export default connect(mapStateToProps)(HomePage);
