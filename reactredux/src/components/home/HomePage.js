import React from 'react';
import {Link} from 'react-router';
import GlobalUserList from '../users/GlobalUserList';
import {connect} from 'react-redux';


class HomePage extends React.Component {
  render() {
    //console.log(JSON.parse(localStorage.getItem('user')));

    let login = ((JSON.parse(localStorage.getItem('user'))).uid);

    return (
      <div className="jumbotron">
        <h1>PPong</h1>
        <p>Ping Pong Online Game Scorer&nbsp;</p>
        <Link to="users" className="btn btn-primary btn-lg">Log in/out</Link>&nbsp;
        <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>&nbsp;

        {login? <Link to="game" className="btn btn-primary btn-lg">Add a game</Link>:""}&nbsp;
        <h2>Top ranking players:</h2>
        <GlobalUserList users={this.props.users}/>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps){
  return {
    users: state.users
  };
}
export default connect(mapStateToProps)(HomePage);
