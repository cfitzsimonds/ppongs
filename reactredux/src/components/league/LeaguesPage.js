import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as leagueActions from '../../actions/leagueActions';
import LeagueList from './LeagueList';
import {browserHistory} from 'react-router';

class LeaguesPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.redirectToAddLeaguePage = this.redirectToAddLeaguePage.bind(this);
  }

  leagueRow(league, index){
    return <div key={index}>{league.title}</div>;
  }

  redirectToAddLeaguePage(){
    browserHistory.push('/league');
  }

  render() {
    const {leagues} = this.props;
    return (
      <div>
        <h1>Leagues</h1>
        <input type="submit"
               value="Add League"
               className="btn btn-primary"
               onClick={this.redirectToAddLeaguePage}
        />
        <LeagueList leagues={leagues}/>
      </div>
    );
  }
}

LeaguesPage.propTypes = {
  leagues: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps){
  return {
    leagues: state.leagues
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(leagueActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaguesPage);
// can define a mapDispatchToProps but is automatically replaced by dispatch atm
