import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const GameForm = ({game, allPlayers, onSave, onChange, saving, errors, currentPlayer, live}) => {
//  console.log(currentPlayer.leagues)
  return (
        <div className="container-fluid">
            <div className="hero-inner game">
                <div className="container">
                    <h1>Games</h1>
                </div>
            </div>
        <div className="container inner">

      <h1>Add Game</h1>

      <SelectInput
        name="game_type"
        label="Game Type"
        value={game.game_type}
        defaultOption="Select a game type"
        options={[{value: 1, text: "Singles"},{value: 2, text: "Doubles"}]}
        onChange={onChange} error={errors.game_type}/>

      <SelectInput
        name="league_name"
        label="League"
        value={game.league_name }
        defaultOption={"Select league this match is in"}
        options={currentPlayer.leagues}
        onChange={onChange}
        error={errors.player_l_1}/>

      <SelectInput
        name="player_names.player_l_1"
        label="You (Home)"
        value={game.player_names.player_l_1 }
        defaultOption="Select yourself"
        options={[{value:currentPlayer.uid, text: currentPlayer.displayName}]}
        onChange={onChange}
        error={errors.player_l_1}

      />



      <SelectInput
        name="player_names.player_l_2"
        label="Your Partner (Home)"
        value={game.player_names.player_l_2}
        onChange={onChange}
        defaultOption="Select your partner"
        options={allPlayers.filter(function(player){
          if(player.value == currentPlayer.uid){
            return false;
          }
          for ( var i in player.leagues){
            if (game.league_name === player.leagues[i].value){
            return true;
            }
          }
          return false;
        })}
        error={errors.player_l_2}
        disabled={game.game_type -2}
      />

      <SelectInput
        name="player_names.player_r_1"
        label="Your Opponent (Away)"
        value={game.player_names.player_r_1}
        onChange={onChange}
        defaultOption="Select your opponent"
        options={allPlayers.filter(function(player){
        if(player.value == currentPlayer.uid){
            return false;
          }
          for ( var i in player.leagues){
            if (game.league_name === player.leagues[i].value){
            return true;
            }
          }
          return false;
        })}
        error={errors.player_r_1}/>
      <SelectInput
        name="player_names.player_r_2"
        label="Your Opponents Partner (Away)"
        value={game.player_names.player_r_2}
        onChange={onChange}
        defaultOption="Select your opponent's partner"
        options={allPlayers.filter(function(player){

        if(player.value == currentPlayer.uid){
            return false;
          }

          for ( var i in player.leagues){
            if (game.league_name === player.leagues[i].value){
            return true;
            }
          }
          return false;
        })}
        error={errors.player_r_2}
        disabled={game.game_type -2}
      />
    {// Need to either add a check to see if a league has a live mode to allow this to show// or just remove it, depending
    }
      <input
        type="submit"
        disabled={!((!!game.game_type)&&(!!game.league_name)&&
          (!!game.player_names.player_l_1) &&(!!game.player_names.player_r_1)&&(
            !!((game.game_type=="2" && !!game.player_names.player_l_2 &&
            !!game.player_names.player_r_2)||(game.game_type=="1") ) ))}
        value={'Go live'}
        className="btn btn-primary"
        onClick={live}
        hidden={live}
      />
    <br />
    &nbsp;
      <TextInput
        name="scores.left"
        label="Your Team (Home)'s Score"
        value={game.scores.left}
        onChange={onChange}
        error={errors.left}/>
      <TextInput
        name="scores.right"
        label="Opposing Team (Away)'s Score"
        value={game.scores.right}
        onChange={onChange}
        error={errors.right}/>


      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Adding...' : 'Add game'}
        className="btn btn-primary"
        onClick={onSave}
      />

    </div></div>
  );
};

GameForm.propTypes = {
  game: React.PropTypes.object.isRequired,
  allPlayers: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default GameForm;
