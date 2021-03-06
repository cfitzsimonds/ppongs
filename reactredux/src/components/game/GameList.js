import React, {PropTypes} from 'react';
import GameListRow from './GameListRow';

// Need to come back and add columns/formatting

const GameList = ({games, users, uid, league, uid2, uid3, uid4, uids}) => {
  games = games.filter(function(game){
    return game.confirmed == 1;
  });
  if (uid){
    games = games.filter(function(game){
      for (var i in game.player_names){
        if( game.player_names[i] === uid){
          return true;
        }
      }

      return false;
    });
  }
  if(uid2){
    games = games.filter(function(game){
      for (var i in game.player_names){
        if( game.player_names[i] === uid2){
          return true;
        }
      }

      return false;
    })
  }
  if (uid3){
    games = games.filter(function(game){
      for (var i in game.player_names){
        if( game.player_names[i] === uid3){
          return true;
        }
      }

      return false;
    });
  }
  if(uid4){
    games = games.filter(function(game){
      for (var i in game.player_names){
        if( game.player_names[i] === uid4){
          return true;
        }
      }

      return false;
    })
  }
  for ( var j in uids){
    games = games.filter(function(game){
      for (var i in game.player_names){
        if( game.player_names[i] === uids[j]){
          return true;
        }
      }

      return false;
    })
  }
  if (league) {
    games = games.filter(function(game){
      if (game.league_name === league){
        return true;
      }
      return false;
    })
  }

  return (
    <table className="table">
      <thead>
      <tr>
        <th>Game Date</th>
        <th>Home Team</th>
        <th>Home Team Score</th>
        <th>Away Team Score</th>
        <th>Away Team</th>
        <th>Winner</th>

      </tr>
      </thead>
      <tbody>
      {games.sort(function(a, b){
        if(a.id > b.id){
          return -1;
        }
        return 1;
      }).map(game =>
        <GameListRow key={game.id} game={game} users={users}/>
      )}
      </tbody>
    </table>
  );
};

GameList.propTypes = {
  games: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  uid: PropTypes.string,
  uid2: PropTypes.string,
  uid3: PropTypes.string,
  uid4: PropTypes.string,
  uids: PropTypes.array,
  league: PropTypes.string
};

export default GameList;
