import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as gameActions from '../../actions/gameActions';
import * as userActions from '../../actions/userActions';
import toastr from 'toastr';
import {bindActionCreators} from 'redux';

const ConfirmGameListRow = function({game, users, currentUser,confirm, deny, num}) {
  console.log(this)
  return (

    <tr>
      <td><Link to={"/confirm/"+(game.id)}>{(new Date (game.id)).toDateString()}</Link></td>
      <td><Link to={"/profile/"+game.player_names.player_l_1}>{uidToNameLookup(game.player_names.player_l_1, users)} </Link><br />
        <Link to={"/profile/"+game.player_names.player_l_2}>{uidToNameLookup(game.player_names.player_l_2, users)}</Link></td>

      <td>{game.scores.left}</td>
      <td>{game.scores.right}</td>
      <td><Link to={"/profile/"+game.player_names.player_r_1}>{uidToNameLookup(game.player_names.player_r_1, users)}</Link><br />
        <Link to={"/profile/"+game.player_names.player_r_2}>{uidToNameLookup(game.player_names.player_r_2, users)}</Link></td>

      <td>{(game.winner === "Left")? "Home": "Away"} Team</td>

      <input
        name={num.toString()}
        type="submit"
        value={'Confirm'}
        className="btn btn-primary"
        onClick={confirm}

      />
      &nbsp;
      <input
        name={num.toString()}
        type="submit"
        value={'Deny'}
        className="btn btn-primary"
        onClick={deny}

      />

    </tr>
  );
}.bind(this);

ConfirmGameListRow.propTypes = {
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

function mapDispatchToProps(dispatch) {

  return {
    actions: bindActionCreators(gameActions, dispatch),
    useractions: bindActionCreators(userActions, dispatch)
  };
}
function save(game, user) {

  console.log(gameActions);
  console.log(gameActions.saveGame(game))
  userActions.saveUser(user);

}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmGameListRow);
