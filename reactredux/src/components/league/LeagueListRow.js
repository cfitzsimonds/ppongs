import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const LeagueListRow = ({league}) => {
  return (
    <tr>
      <td><Link to={'/league/' + league.uid}>{league.name}</Link></td>
      <td>{league.sport}</td>
    </tr>
  );
};

LeagueListRow.propTypes = {
  league: PropTypes.object.isRequired
};

export default LeagueListRow;
