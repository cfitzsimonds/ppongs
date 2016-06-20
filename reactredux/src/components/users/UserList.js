import React, {PropTypes} from 'react';
import {Link} from 'react-router';
const UserList = ({users}) => {
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
      {users.map(user =>
        <tr key={user.uid}><td ><Link to={"/profile/"+user.uid}>
           {user.displayName}</Link></td></tr>
      )}
      </tbody>
    </table>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired
};

export default UserList;
