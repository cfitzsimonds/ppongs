import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as leagueActions from '../../actions/leagueActions';
import * as userActions from '../../actions/userActions';
import CreateLeagueForm from './CreateLeagueForm';
import toastr from 'toastr';

class CreateLeaguePage extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      //in use manage league form he recommends changing this
      league: Object.assign({}, this.props.league),
      user: Object.assign({}, this.props.user),
      leagues: this.props.leagues,
      errors: {},
      saving: false
    };

    this.updateLeagueState = this.updateLeagueState.bind(this);
    this.saveLeague = this.saveLeague.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if ( this.props.league.id != nextProps.league.id) {
      // handles refresh, runs anytime it thinks props might have chagned
      this.setState({league: Object.assign({}, nextProps.league)});
    }
  }

  updateLeagueState(event) {
    const field = event.target.name;
    let league = this.state.league;
    league[field] = event.target.value;
    return this.setState({league: league});
  }

  saveLeague(event){
    event.preventDefault();
    let league = this.state.league;
    league.admin = this.state.user.uid;

    //let toadd=  {text: getLeagueById(this.props.leagues, this.state.league.uid).name, value: this.state.league.uid};
    let valid = true;



    //console.log(user)
    this.setState({saving: true});
    //if error here persists, refer to dispatch create andupdate -- Fix was to add bind of this context

    // needs to mkae sure not already in league
    if(!getLeagueByName(this.props.leagues, league.name)){

      this.props.leagueactions.saveLeague(league).then(() => {

        this.redirect()}).catch(error => {
        toastr.error(error); this.setState({saving: false});
      })
    } else {
      toastr.error("This league name is already in use");
      this.setState({saving: false});
    }



  }

  redirect() {
    this.setState({saving: false});
    toastr.success('League created');
    this.context.router.push('/leagues');
  }

  render(){
    //  console.log(this.props.leagues);
    return (
      <CreateLeagueForm
        allLeagues={this.props.leagues}
        onChange={this.updateLeagueState}
        onSave={this.saveLeague}
        league={this.state.league}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

CreateLeaguePage.propTypes = {
  league: PropTypes.object,
  leagues: PropTypes.array.isRequired,
  leagueactions: PropTypes.object.isRequired,
  useractions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

CreateLeaguePage.contextTypes = {
  router: PropTypes.object
};

function getLeagueById(leagues, id) {
  const league = leagues.filter(league => league.uid == id);
  if (league.length) return league[0];
  return null;
}

function getLeagueByName(leagues, id) {
  const league = leagues.filter(league => league.name == id);
  if (league.length) return league[0];
  return null;
}


// one day inspect ownProps
function mapStateToProps(state, ownProps){
  const leagueId = ownProps.params.id;
  let league = {admin:"", name: "", pin:"", uid:""};
  let user = (JSON.parse(localStorage.getItem('user')));

  if (leagueId && state.leagues.length > 0){
    league = getLeagueById(state.leagues, leagueId);
  }


  return {
    league: league,
    leagues: state.leagues,
    user: user
  };
}

function mapDispatchToProps(dispatch) {

  return {
    leagueactions: bindActionCreators(leagueActions, dispatch),
    useractions: bindActionCreators(userActions, dispatch)

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLeaguePage);
