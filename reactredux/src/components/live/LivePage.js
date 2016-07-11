import React from 'react';
import {Link} from 'react-router';
import GlobalUserList from '../users/GlobalUserList';
import {connect} from 'react-redux';


class HomePage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.render = this.render.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

    firebase.database().ref('dinos/').once('value', function(el){
      let temp = {};
      let k = '';
      for (var x in el.val()){
        temp[x] = el.val()[x];
        k = x;
      }

        temp[k]['away'] = 0;
        temp[k]['home'] = 0;
        firebase.database().ref('dinos/').update(temp);

      })

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

      <div className="jumbotron">
      <h1>Live Score Feed</h1>
      <table className="table" id="bigT">
        <thead>
        <tr>
          <th><h2>Home</h2></th>
          <th><h2>Away</h2></th>

        </tr>
        </thead>
        <tbody>
        <tr>
          <td><h2>{this.state.home}</h2></td>
          <td><h2>{this.state.away}</h2></td>
        </tr>
        </tbody>
      </table>
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
