import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class UsersPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.redirectToAddUserPage = this.redirectToAddUserPage.bind(this);
    this.render = this.render.bind(this);
    this.convertToStoreUser = this.convertToStoreUser.bind(this);
    //this.setState({currentUser: "In"});
    let temp = (firebase.auth().currentUser) ? "Out": "In";
     this.state = {
      currentUser : temp
    }

  }
  componentWillReceiveProps(nextProps){
    if ( this.props.currentUser != nextProps.currentUser) {
      // handles refresh, runs anytime it thinks props might have chagned
      this.setState({currentUser: Object.assign({}, nextProps.currentUser)});
    }
  }
  redirect(){
    toastr.success('Logged in');
    this.context.router.push('/games');
  }
  convertToStoreUser(googUser){
    let newUser = {};
    newUser["displayName"] = googUser.displayName;
    newUser.uid = googUser.uid;
    newUser.email = googUser.email;
    // handle leagues later
    newUser.proPic = googUser.photoURL;
    // might need refreshtoken later?
    this.setState({user: newUser});
  }
  saveUser() {
    event.preventDefault();
    let user = this.state.user;
    this.setState({saving: true});

    //let scorecomp = 1;
    //if error here persists, refer to dispatch create andupdate -- Fix was to add bind of this context

    this.props.actions.saveUser(this.state.user)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  userRow(user, index){
    return <div key={index}>hello</div>;
  }

  redirectToAddUserPage(){
    //browserHistory.push('/user');
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        console.log(result.user);
        this.convertToStoreUser(result.user);
        this.saveUser();
        this.setState({currentUser: "Out"});

        // ...
      }.bind(this)).then(function (result) {
        console.log(this.state.currentUser);
      }.bind(this));
    } else {
      firebase.auth().signOut();
      console.log("out")
      this.forceUpdate();
      this.setState({currentUser: "In"});
    }
  }

  render() {
    const {users} = this.props;
    let logButtonText = (firebase.auth().currentUser ) ? null : null;
    //this.state.currentUser
    //let logButtonText = "Log in";

    return (
      <div>
        <h1>Users</h1>
        <input type="submit"
               value={"Log " + (this.state.currentUser)}
               className="btn btn-primary"
               onClick={this.redirectToAddUserPage}
        />
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
UsersPage.contextTypes = {
  router: PropTypes.object
};
////
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
// can define a mapDispatchToProps but is automatically replaced by dispatch atm



