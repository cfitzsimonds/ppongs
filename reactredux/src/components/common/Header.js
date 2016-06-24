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
  }

  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>
      {" | "}
      <Link to="/games" activeClassName="active">Games</Link>
      {" | "}
      <Link to="/users" activeClassName="active">Users</Link>
      {" | "}
      <Link to="/leagues" activeClassName="active">Leagues</Link>
      {" | "}
      <Link to="/h2h" activeClassName="active">HeadToHead</Link>
      {" | "}
      {
        ((JSON.parse(localStorage.getItem('user'))))?(<Link to={((JSON.parse(localStorage.getItem('user'))).uid)?
        ("/profile/"+((JSON.parse(localStorage.getItem('user'))).uid)):"/users"} activeClassName="active">
      {((JSON.parse(localStorage.getItem('user'))).uid)? "My Profile": "Login"}</Link>):(<Link to="/users" activeClassName="active">Log in</Link>)}

      {loading && <LoadingDots interval={100} dots={20}/>}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
