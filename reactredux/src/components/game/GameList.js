import React, {PropTypes} from 'react';
import GameListRow from './GameListRow';

// Need to come back and add columns/formatting

const GameList = ({games}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>Game Date</th>
        <th>Left Team</th>
        <th>Left Score</th>
        <th>Right Score</th>
        <th>Right Team</th>
        <th>Winner</th>

      </tr>
      </thead>
      <tbody>
      {games.map(game =>
        <GameListRow key={game.id} game={game}/>
      )}
      </tbody>
    </table>
  );
};

GameList.propTypes = {
  games: PropTypes.array.isRequired
};

export default GameList;
