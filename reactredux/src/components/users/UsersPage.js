import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import UserList from './UserList';
import {browserHistory} from 'react-router';




// DEPRECIATED
class UsersPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.redirectToAddUserPage = this.redirectToAddUserPage.bind(this);
  }

  gameRow(game, index){
    return <div key={index}>hello</div>;
  }

  redirectToAddUserPage(){
    browserHistory.push('/user');
  }

  render() {
    const {users} = this.props;
    console.log(users);
    return (
    <div className="container-fluid">
            <div className="hero-inner">
                <div className="container">
                    <h1>Users</h1>
                    <input className="btn btn-primary" type="submit"
               value="Add User"
               className="btn btn-primary"
               onClick={this.redirectToAddUserPage}
        />
                </div>
            </div>
        <div className="container inner">
        <UserList users={users}/>
      </div>
    );
  }
}

UsersPage.propTypes = {
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps){
  return {
    users: state.users
  };
}

////
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
// can define a mapDispatchToProps but is automatically replaced by dispatch atm
