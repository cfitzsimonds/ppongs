import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';
import {browserHistory} from 'react-router';

const Header = ({loading}) => {

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
  // let login = ((JSON.parse(localStorage.getItem('user'))).uid);
  let login = true;
  return (

    <nav>

      <div className="header-container container">
      <div className="navbar-brand">
        <img className="img-responsive" src="http://www.reddiamonddigital.com/ppong/logo.png" />
        </div>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      <Link to="/about" activeClassName="active">About</Link>
      {login? <Link to="/games" activeClassName="active">Games</Link> : ""}

      {login? <Link to="/leagues" activeClassName="active">Leagues</Link> : ""}

      {login? <Link to="/h2h" activeClassName="active">HeadToHead</Link> : ""}

      {
        // this looks messy, all it does is parse the user data so that if logged in it will bring you to your own profile
        ((JSON.parse(localStorage.getItem('user'))))?
          (<Link to={((JSON.parse(localStorage.getItem('user'))).uid)?
              ("/profile/"+((JSON.parse(localStorage.getItem('user'))).uid))
              :"/users"} activeClassName="active">
                {((JSON.parse(localStorage.getItem('user'))).uid)?
                  "My Profile":
                  "Login"}
          </Link>):
          (<Link to="/users" activeClassName="active">Log in</Link>)}

      
      {login? <Link to="/users" activeClassName="active">Log Out</Link> : ""}
      
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


export default Header;
function uidLookup(uid, users){
  for(var x in users){
    if (users[x].uid === uid){
      return users[x];
    }
  }
  return false;
}
