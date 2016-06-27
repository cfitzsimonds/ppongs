import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GameList from '../game/GameList';
import UserList from '../users/UserList';
import {browserHistory} from 'react-router';

class LeagueDisplay extends React.Component {
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
    if ( this.props.league.uid != nextProps.league.uid) {
      // handles refresh, runs anytime it thinks props might have chagned
      this.setState({league: Object.assign({}, nextProps.league)});
    }
  }
  handleClick (e) {
    this.setState({checked: e.target.checked});
  };
  render() {
    if((JSON.parse(localStorage.getItem('user'))).uid === ''){
      browserHistory.push('/users');

    }
    let user =  this.props.user;
    let games = this.props.games;
    var checked;

    return (
      <div >
        <h1>{this.props.league.name}</h1>
        <h3>Members:</h3>
        <UserList users={this.props.users} league={this.props.league.uid.toString()} />
        <h3>Game History: </h3>
        <GameList games={games} users={this.props.users} league={this.props.league.uid.toString()} />

      </div>
    );
  }
}
function mapStateToProps(state, ownProps){
  const leagueId = ownProps.params.id;
  let league = {
    admin: "",
    pin: '',
    uid: '',
    name: ''
  };

  if (leagueId && state.users.length > 0){
    league = getLeagueById(state.leagues, leagueId);
  }

  /*const authorsFormattedForDropdown = state.users.map(user => {
   return {
   value: user.uid,
   text: author.firstName + ' ' + author.lastName
   };
   });*/
  console.log(league)
  return {
    league: league,
    users: state.users,
    games: state.games
  };
}

function getLeagueById(users, id) {
  const user = users.filter(user => user.uid == id);
  if (user.length) return user[0];
  return null;
}
LeagueDisplay.propTypes = {
  league: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  games: PropTypes.array.isRequired
};
export default connect(mapStateToProps)(LeagueDisplay);
