import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as leagueActions from '../../actions/leagueActions';
import LeagueList from './LeagueList';
import {browserHistory} from 'react-router';

class LeaguesPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.redirectToAddLeaguePage = this.redirectToAddLeaguePage.bind(this);
  }

  leagueRow(league, index){
    return <div key={index}>{league.title}</div>;
  }

  redirectToAddLeaguePage(){
    browserHistory.push('/league');
  }
  redirectToCreateLeaguePage(){
    browserHistory.push('/leagueCreate');
  }

  render() {
    /*if((JSON.parse(localStorage.getItem('user'))).uid === ''){
      browserHistory.push('/users');
      return null;
    }*/
    let user = getUserById(this.props.users, (JSON.parse(localStorage.getItem('user'))).uid);
    const {leagues} = this.props;
    return (
      <div className="container-fluid">
            <div className="hero-inner">
                <div className="container">
                    <h1>My Leagues</h1>
                    <input type="submit"
               value="Join League"
               className="btn btn-primary"
               onClick={this.redirectToAddLeaguePage}
        />
        &nbsp;
        <input type="submit"
               value="Create a League"
               className="btn btn-secondary"
               onClick={this.redirectToCreateLeaguePage}
        />
                </div>
            </div>
        <div className="container inner">

        <LeagueList leagues={leagues.filter(function(el){
          for (var i in user.leagues){
            if (user.leagues[i].value == el.uid){
              return true;
            }

          }
          return false;
        })}/> 
      </div></div>
    );
  }
}

LeaguesPage.propTypes = {
  leagues: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};


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
    games: state.games,
    leagues: state.leagues
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(leagueActions, dispatch)
  };
}
function getUserById(users, id) {
  const user = users.filter(user => user.uid == id);
  if (user.length) return user[0];
  return {
    "displayName" : "",
    "email" : "",
    "leagues" : [],
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
}
export default connect(mapStateToProps, mapDispatchToProps)(LeaguesPage);
// can define a mapDispatchToProps but is automatically replaced by dispatch atm
