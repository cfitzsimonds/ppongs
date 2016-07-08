import React, {PropTypes} from 'react';
import {Link} from 'react-router';
const GlobalUserList = ({users}) => {
  users = users.filter(function(user){
    return user.uid != '';
  });
  users = users.filter(function(user){
    return user.hasOwnProperty('statistics');
  });
  users = (ArrNoDupe(users).map(function(element){return JSON.parse(element)}))
  return (
    <table className="table">
      <thead>
      <tr>
        <th>Place</th>
        <th>Icon</th>
        <th>Name</th>
        <th>Wins</th>
        <th><a href="https://en.wikipedia.org/wiki/Elo_rating_system">Elo</a></th>




      </tr>
      </thead>
      <tbody>
      {users.sort(function(a, b){
          return b.elo - a.elo;

      }).slice(0,3).map((user, ind) =>

        <tr key={ind}>
          <td>
            {ind+1}
          </td>
          <td>
            <img src={user.proPic} id="smallProPic"/>
          </td>
          <td >
            <Link to={"/profile/"+user.uid}>
              {user.displayName}
            </Link>
          </td>
          <td>
            {user.statistics.wins.singles + user.statistics.wins.doubles}
          </td>
          <td>
            {user.elo}
          </td>


        </tr>

      )}
      </tbody>
    </table>
  );
};
function mapStateToProps(state, ownProps){
  return {
    users: state.users
  };
}
GlobalUserList.propTypes = {
  users: PropTypes.array.isRequired
};

export default GlobalUserList;
function ArrNoDupe(a) {
  var temp = {};
  for (var i = 0; i < a.length; i++){


    temp[(a[i].uid)] = true;}

  return Object.keys(temp).map(function(el){
    return JSON.stringify(uidLookup(el, JSON.parse(localStorage.getItem('users'))));

  });
}
function uidLookup(uid, users){
  for(var x in users){
    if (users[x].uid === uid){
      return users[x];
    }
  }
  return false;
}
