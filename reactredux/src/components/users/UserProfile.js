import React from 'react';
import {Link} from 'react-router';


class HomePage extends React.Component {
  render() {
    //console.log(JSON.parse(localStorage.getItem('user')));



    return (
      <div className="jumbotron">
        <h1>USER</h1>
        <p>React, Redux, and React Router in ES6 based ping pong scoretracker</p>
        <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
      </div>
    );
  }
}

export default HomePage;
