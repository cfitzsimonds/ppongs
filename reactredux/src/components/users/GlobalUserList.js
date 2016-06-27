import React, {PropTypes} from 'react';
import {Link} from 'react-router';
const GlobalUserList = ({users}) => {

  return (
    <table className="table">
      <thead>
      <tr>
        <th>Place</th>
        <th>Icon</th>
        <th>Name</th>
        <th>Elo</th>




      </tr>
      </thead>
      <tbody>
      {users.sort(function(a, b){
          return b.elo - a.elo;

      }).slice(0,3).map((user, ind) =>

        <tr key={ind}>
          <td>
            {ind+1}
          </td>
          <td>
            <img src={user.proPic} id="smallProPic"/>
          </td>
          <td >
            <Link to={"/profile/"+user.uid}>
              {user.displayName}
            </Link>
          </td>
          <td>
            {user.elo}
          </td>


        </tr>

      )}
      </tbody>
    </table>
  );
};
function mapStateToProps(state, ownProps){
  return {
    users: state.users
  };
}
GlobalUserList.propTypes = {
  users: PropTypes.array.isRequired
};

export default GlobalUserList;
