import React from 'react';
import {Link} from 'react-router';
import GlobalUserList from '../users/GlobalUserList';
import {connect} from 'react-redux';


class HomePage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.render = this.render.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      //in use manage course form he recommends changing this
      users: Object.assign({}, this.props.users),
      home: 0,
      away: 0
    };


  }

  testasdf(){
    {firebase.database().ref("dinos").on("child_changed", function(snapshot){
     console.log(snapshot.val());
    })
    }
  }
  homeup (){
    this.setState({home: this.state.home +1}) ;

  }
  componentDidMount(){
    let t = this.setState;
    t = t.bind(this);
    firebase.database().ref("dinos").on("child_changed", function(snapshot){
      let h = snapshot.val().home;
      let a = snapshot.val().away;
      t({home: h, away: a});
    })
  }
  awayup(){
    this.setState({away: this.state.away +1}) ;
  }
  render() {
    //console.log(JSON.parse(localStorage.getItem('user')));

    let login = ((JSON.parse(localStorage.getItem('user'))).uid);
    let homenum = 0;
    let awaynum = 0;
 //   this.homeup();
 //   this.awayup();
    return (
      <div className="container-fluid">
        <div className="hero">
          <h1>React, Redux, and React Router in ES6 based game scoretracker</h1>
          <Link to="users" className="btn btn-primary">Log in/out</Link>
          <Link to="about" className="btn btn-secondary">Learn More</Link>
          {login? <Link to="game" className="btn btn-primary btn-lg">Add a game</Link>:""}
        </div>
        <div className="container">
          <div className="jumbotron">
            <h2>Top ranking players:</h2>
            <GlobalUserList users={this.props.users}/>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps){
  return {
    users: state.users,
    home: 0,
    away: 0
  };
}
export default connect(mapStateToProps)(HomePage);
