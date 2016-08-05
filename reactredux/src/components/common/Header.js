import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';
import {browserHistory} from 'react-router';
var Adal = require('../../adal/adal-request');
import * as userActions from '../../actions/userActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import userApi from '../../api/userApi';


const Header = ({loading}) => {
  Adal.processAdalCallback();
  /*.adalRequest({
        url: 'https://graph.microsoft.com/v1.0/me/memberOf?$top=500',
        headers: {
          'Accept': 'application/json;odata.metadata=full'
        }
      })*/
  //firebase.database().ref("leagues/").push({name:"test", uid: "146651333333", admin:"A5it5HJdRtXiBM3dKyRAjUME5wz2", pin:"1234", members:["A5it5HJdRtXiBM3dKyRAjUME5wz2", "4Q7lBJlRX5M5sg3wCXTPdUTpDwy1"]});

  if(!(JSON.parse(localStorage.getItem('user')))){
    localStorage.setItem('user', JSON.stringify({
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
      "uid" : "",
      "elo" : 0
    }));
  } else {
    localStorage.setItem('user', JSON.stringify(uidLookup((JSON.parse(localStorage.getItem('user'))).uid, (JSON.parse(localStorage.getItem('users'))))));
  }
  let login = ((JSON.parse(localStorage.getItem('user'))).uid);
  if(!login){
    Adal.login().then(function(){
      if(!uidLookup(Adal.getUser()._user.profile.oid, (JSON.parse(localStorage.getItem('users'))))){
        userApi.saveUser(convertToStoreUser(Adal.getUser()._user)).then(function(stuff){
          localStorage.setItem('user', JSON.stringify(stuff))
        });
      }

    })
  }
  return (

    <nav>

      <div className="header-container container">
            <div className="navbar-brand">
              <img className="img-responsive" src={require('../../assets/logo.png')} />
              </div>
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
            <Link to="/about" activeClassName="active">About</Link>
            {login? <Link to="/games" activeClassName="active">Games</Link> : ""}

            {login? <Link to="/leagues" activeClassName="active">Leagues</Link> : ""}

            {login? <Link to="/h2h" activeClassName="active">HeadToHead</Link> : ""}




            {login? <Link to="/confirm" activeClassName="active">{login? "Game confirmations " : ""}
              {login? "("+(((JSON.parse(localStorage.getItem('user'))).confirmlist|| ["a"]).length-1 ) +")": ""}</Link> : ""}
            {loading && <LoadingDots interval={100} dots={20}/>}
            </div>
          </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
function uidLookup(uid, users){
  for(var x in users){
    if (users[x].uid === uid){
      return users[x];
    }
  }
  return false;
}
var convertToStoreUser = function(user){
  let newUser = {};
  newUser["displayName"] = user.profile.name;
  newUser.uid = user.profile.oid;
  newUser.email = user.userName;
  // handle leagues later
  newUser.proPic = "https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email="+user.userName +"&UA=0&size=HR648x648";
  return newUser;
}
function mapStateToProps(state, ownProps){
  localStorage.setItem('users', JSON.stringify(state.users));
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
