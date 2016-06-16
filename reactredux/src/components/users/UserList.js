import React, {PropTypes} from 'react';


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
        <tr key={user.uid}><td >{user.displayName}</td></tr>
      )}
      </tbody>
    </table>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired
};

export default UserList;
