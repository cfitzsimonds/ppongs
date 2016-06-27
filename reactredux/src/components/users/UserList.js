import React, {PropTypes} from 'react';
import {Link} from 'react-router';
const UserList = ({users, league}) => {
  users = users.filter(function(el){
    return el.leagues.map(function (e){
      return e.value === league;
    }).reduce(function (a, b){
      return a || b;
    })
  });
  return (
    <table className="table">
      <thead>
      <tr>
        <th>Place</th>
        <th>Name</th>
        <th>Elo</th>
        <th>Wins</th>
        <th>Losses</th>
        <th>Draws</th>



      </tr>
      </thead>
      <tbody>
      {users.sort(function(a, b){
        if(!(((a.league_stats[league].wins+.5*a.league_stats[league].draws)/(a.league_stats[league].games_played))- ((b.league_stats[league].wins+.5*b.league_stats[league].draws)/(b.league_stats[league].games_played)))){
          return b.elo - a.elo;

        }
        return ((b.league_stats[league].wins+.5*b.league_stats[league].draws)/(b.league_stats[league].games_played))- ((a.league_stats[league].wins+.5*a.league_stats[league].draws)/(a.league_stats[league].games_played));
      }).map((user, ind) =>

        <tr key={ind}>
          <td>
            {ind+1}
          </td>
          <td >
            <Link to={"/profile/"+user.uid}>
              {user.displayName}
            </Link>
          </td>
          <td>
            {user.elo}
          </td>
          <td>
            {user.league_stats[league].wins}

          </td>
          <td>
            {user.league_stats[league].losses}

          </td>
          <td>
            {user.league_stats[league].draws}

          </td>

        </tr>

      )}
      </tbody>
    </table>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  league: PropTypes.string.isRequired
};

export default UserList;
