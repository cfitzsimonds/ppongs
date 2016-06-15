import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const GameListRow = ({game}) => {
  return (

    <tr>
      <td><Link to={'/game/' + game.id}>{(new Date (game.id)).toDateString()}</Link></td>
      <td>{game.player_names.player_l_1} <br />
        {game.player_names.player_l_2}</td>

      <td>{game.scores.left}</td>
      <td>{game.scores.right}</td>
      <td>{game.player_names.player_r_1}<br />{game.player_names.player_r_2}</td>
      
      <td>{game.winner} Side</td>


    </tr>
  );
};

GameListRow.propTypes = {
  game: PropTypes.object.isRequired
};

export default GameListRow;
