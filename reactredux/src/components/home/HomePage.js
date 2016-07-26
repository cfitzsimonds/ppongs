import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import GlobalUserList from '../users/GlobalUserList';
import {connect} from 'react-redux';
var Adal = require('../../adal/adal-request');

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
Adal.processAdalCallback();
Adal.adalRequest({
      url: 'https://graph.microsoft.com/v1.0/me/memberOf?$top=500',
      headers: {
        'Accept': 'application/json;odata.metadata=full'
      }
    })
  }

  testasdf(){
    {firebase.database().ref("dinos").once("child_changed", function(snapshot){
     console.log(snapshot.val());
    })
    }
  }
  homeup (){
    this.setState({home: this.state.home +1}) ;

  }
  componentDidMount(){
    let t = this.context.router.push;
    t = t.bind(this);
    firebase.database().ref("dinos").once("child_changed", function(snapshot){
      t('/game');
      t('/live/1466513558321');

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
HomePage.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state, ownProps){
  return {
    users: state.users,
    home: 0,
    away: 0
  };
}

export default connect(mapStateToProps)(HomePage);
