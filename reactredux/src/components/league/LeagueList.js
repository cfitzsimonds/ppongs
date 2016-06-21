import React, {PropTypes} from 'react';
import LeagueListRow from './LeagueListRow';

const LeagueList = ({leagues}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Length</th>
      </tr>
      </thead>
      <tbody>
      {leagues.map(league =>
        <LeagueListRow key={league.uid} league={league}/>
      )}
      </tbody>
    </table>
  );
};

LeagueList.propTypes = {
  leagues: PropTypes.array.isRequired
};

export default LeagueList;
