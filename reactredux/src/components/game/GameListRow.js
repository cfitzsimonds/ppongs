import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const GameListRow = ({game, users}) => {
  return (

    <tr>
      <td><Link to={'/game/' + game.id}>{(new Date (game.id)).toDateString()}</Link></td>
      <td><Link to={"/profile/"+game.player_names.player_l_1}>{uidToNameLookup(game.player_names.player_l_1, users)} </Link><br />
        <Link to={"/profile/"+game.player_names.player_l_2}>{uidToNameLookup(game.player_names.player_l_2, users)}</Link></td>

      <td>{game.scores.left}</td>
      <td>{game.scores.right}</td>
      <td><Link to={"/profile/"+game.player_names.player_r_1}>{uidToNameLookup(game.player_names.player_r_1, users)}</Link><br />
        <Link to={"/profile/"+game.player_names.player_r_2}>{uidToNameLookup(game.player_names.player_r_2, users)}</Link></td>

      <td>{game.winner} Side</td>


    </tr>
  );
};

GameListRow.propTypes = {
  game: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};


// one day inspect ownProps
function mapStateToProps(state, ownProps){


  const authorsFormattedForDropdown = state.users.map(author => {
    return {
      author

    };
  });

  return {
    authors: authorsFormattedForDropdown
  };
}

function uidToNameLookup(uid, users){
  //console.log(uid);
  //console.log(users);
  for(var x in users){
    if (users[x].uid === uid){
      return users[x].displayName;
    }
  }
}



export default connect(mapStateToProps)(GameListRow);
