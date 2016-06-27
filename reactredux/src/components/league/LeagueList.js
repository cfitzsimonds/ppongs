import React, {PropTypes} from 'react';
import LeagueListRow from './LeagueListRow';

const LeagueList = ({leagues}) => {
  console.log(leagues)
  return (
    <table className="leaguetable">
      <thead>
      <tr>
        <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
      {leagues.map(league =>
        <LeagueListRow key={league.uid.toString()} league={league}/>
      )}
      </tbody>
    </table>
  );
};

LeagueList.propTypes = {
  leagues: PropTypes.array.isRequired
};

export default LeagueList;
