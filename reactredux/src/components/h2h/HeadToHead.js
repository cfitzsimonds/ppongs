import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../../actions/gameActions';
import GameList from '../game/GameList';
import {browserHistory} from 'react-router';
import SelectInput from '../common/SelectInput';

class HeadToHeadPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      user : this.props.user
    };

    this.redirectToAddGamePage = this.redirectToAddGamePage.bind(this);
    this.render = this.render.bind(this);
    this.handle = this.handle.bind(this);
    this.state.uids = ['','','',''];
  }

  gameRow(game, index){
    return <div key={index}>hello</div>;
  }

  redirectToAddGamePage(){
    browserHistory.push('/game');
  }

  handle(event) {
    let uids = this.state.uids;
    uids[event.target.name] = event.target.value;
    this.setState({uids:uids})
  }
  render() {
    if((JSON.parse(localStorage.getItem('user'))).uid === ''){
      //browserHistory.push('/users');

    }
    const {games} = this.props;
    let user = this.props.user|| {leagues: []};
    let users = this.props.users ;

    return (
            <div className="container-fluid">
                  <div className="hero-inner">
                      <div className="container">
                          <h1>Head To Head</h1>
                      </div>
                  </div>
              <div className="container inner">
        {[0,1,2,3].map(function (el, ins){
          return (<div key={ins}><SelectInput
            name={ins.toString()}
            label={"Player number " + (ins+1).toString()}
            value={this.state.uids[ins]}
            defaultOption={"Select a player to search for"}
            options={users.filter(function(player){
          for ( var i in player.leagues){
            for( var j in user.leagues){
                if (user.leagues[j].value === player.leagues[i].value){

                return true;
              }
            }

          }
          return false;
        }).map(function(pl){
          return {
            text: pl.displayName,
            value: pl.uid
          }
        })}
            onChange={this.handle}
          /></div>)
        }.bind(this))}
        {user.leagues.map(function(el){
          return (<div key={el.value}><h3>{el.text}</h3>
            <GameList  games={games} users={users} league={el.value} uid={this.state.uids[0]} uids={this.state.uids}/></div>)
        }.bind(this))}

      </div></div>
    );
  }
}

HeadToHeadPage.propTypes = {
  games: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  user: PropTypes.object
};

function mapStateToProps(state, ownProps){
  //console.log(state);
  let user = findUser(state.users, (JSON.parse(localStorage.getItem('user'))).uid);

  return {
    games: state.games,
    users: state.users,
    user: user
  };
}

////
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(gameActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeadToHeadPage);
// can define a mapDispatchToProps but is automatically replaced by dispatch atm
function findUser(userlist, id){
  for (var i in userlist){
    if (userlist[i].uid === id){
      return userlist[i]
    }
  }
}
