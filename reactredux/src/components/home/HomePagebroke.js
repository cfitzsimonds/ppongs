import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import GlobalUserList from '../users/GlobalUserList';
import {connect} from 'react-redux';
import {ReactNativeAD, ADLoginView} from 'react-native-azure-ad'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.AzureADContext = {
      client_id : CLIENT_ID,
      // Optional
      redirectUrl : 'http://localhost:8080',
      // Optional
      authority_host : 'https://login.microsoftonline.com/common/oauth2/authorize',
      // Optional
      tenant  : 'common',
      // This is required if client_id is a web application id
      // but not recommended doing this way.
      client_secret : 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      resources : [
        'https://graph.microsoft.com',
        'https://outlook.office365.com',
        // ... more resources
      ]
    }
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
    return <ADLoginView
              context={ReactNativeAD.getContext(CLIENT_ID)}
              onSuccess={this.onLoginSuccess.bind(this)}/>
  }
  onLoginSuccess(credentials) {
    console.log(credentials['https://outlook.office365.com'].access_token)
    // use the access token ..
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
