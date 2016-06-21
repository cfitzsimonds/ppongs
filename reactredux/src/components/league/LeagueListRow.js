import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const LeagueListRow = ({league}) => {
  return (
    <tr>
      <td><a href={league.uid} target="_blank">{league.uid}</a> </td>
      <td><Link to={'/league/' + league.uid}>{league.name}</Link></td>
    </tr>
  );
};

LeagueListRow.propTypes = {
  league: PropTypes.object.isRequired
};

export default LeagueListRow;
