import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import {browserHistory} from 'react-router';
import UserList from './UserList';
import toastr from 'toastr';

class UsersPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.redirectToAddUserPage = this.redirectToAddUserPage.bind(this);
    this.render = this.render.bind(this);
    this.convertToStoreUser = this.convertToStoreUser.bind(this);
    //this.checkAuth = this.checkAuth.bind(this);
    //this.setState({currentUser: "In"});
    //let temp = (firebase.auth().currentUser) ? "out": "in";
     this.state = {
      currentUser : 'in'
    }

  }

  componentDidMount(){
    //console.log((/[^a-zA-Z0-9]/.test(localStorage.getItem('userid'))))
    if(!(/[^a-zA-Z0-9]/.test(localStorage.getItem('userid')))){
      this.setState({currentUser: "out"});
    } else {
      this.setState({currentUser: "in"});
    }
    if ((localStorage.getItem('userid'))== null){
      this.setState({currentUser: "in"});
    }
};


  redirect(){
    localStorage.setItem('userid', firebase.auth().currentUser.uid);
    toastr.success('Logged in');

    this.context.router.push('/users');
    //console.log(this.props.users);
  }
  convertToStoreUser(googUser){
    let newUser = {};
    newUser["displayName"] = googUser.displayName;
    newUser.uid = googUser.uid;
    newUser.email = googUser.email;
    // handle leagues later
    newUser.proPic = (googUser.photoURL || 'http://i.imgur.com/Zui7Sop.png');
    // might need refreshtoken later?
    this.setState({user: newUser});
  }

  checkAuth(){
    if(firebase.auth().currentUser){
      this.setState({currentUser: "out"});
    } else {
      this.setState({currentUser: "in"});
    }
  }

  saveUser() {
    event.preventDefault();
    let user = this.state.user;
    this.setState({saving: true});

    //let scorecomp = 1;
    //if error here persists, refer to dispatch create andupdate -- Fix was to add bind of this context


    this.props.actions.saveUser(this.state.user)
      .then(() => {
        localStorage.setItem('user', JSON.stringify(uidLookup(this.state.user.uid, this.props.users)));
          this.redirect();

          //console.log(uidLookup(this.state.user.uid, this.props.users))
        }
      )
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }



  redirectToAddUserPage(){
    //browserHistory.push('/user');
    localStorage.setItem('user', JSON.stringify({
      "displayName" : "",
      "email" : "",
      "leagues" : [],
      "proPic" : "",
      "statistics" : {
        "draws" : {
          "doubles" : 0,
          "singles" : 0
        },
        "games_played" : {
          "doubles" : 0,
          "singles" : 0
        },
        "losses" : {
          "doubles" : 0,
          "singles" : 0
        },
        "wins" : {
          "doubles" : 0,
          "singles" : 0
        }
      },
      "uid" : "",
      "elo" : 0
    }));
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        console.log(result);
        this.convertToStoreUser(result.user);
        this.saveUser();
        this.setState({currentUser: "out"});
        this.forceUpdate();
        //browserHistory.push('/games');
        //browserHistory.go(-11);

      }.bind(this))

    } else {
      firebase.auth().signOut();
      localStorage.setItem('userid', "not here");
      toastr.success('Logged out');
      this.setState({currentUser : "in"});
      //console.log("out")
      this.forceUpdate();
      browserHistory.push('/users');
    }
    //browserHistory.push('/games');
  }

  render() {
    //this.state.currentUser = (firebase.auth().currentUser) ? "out": "in";
    const {users} = this.props;

    //this.checkAuth();
    let loggedout = (<div>
      <h1>Users</h1>
      <input type="submit"
             value={"Log " + (this.state.currentUser)}
             className="btn btn-primary"
             onClick={this.redirectToAddUserPage}
      />
    </div>);
    let loggedin = (<div>
      <h1>Logged in! </h1>
      <input type="submit"
             value={"Log " + (this.state.currentUser)}
             className="btn btn-primary"
             onClick={this.redirectToAddUserPage}
      />
    </div>);
    return (((!(/[^a-zA-Z0-9]/.test(localStorage.getItem('userid'))))&&!((localStorage.getItem('userid'))=== null))? loggedin : (loggedout)

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
UsersPage.contextTypes = {
  router: PropTypes.object
};
////
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}


function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
// can define a mapDispatchToProps but is automatically replaced by dispatch atm


function uidLookup(uid, users){
  for(var x in users){
    if (users[x].uid === uid){
      return users[x];
    }
  }
  return false;
}
