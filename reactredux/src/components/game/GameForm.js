import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const GameForm = ({game, allPlayers, onSave, onChange, saving, errors, currentPlayer}) => {
//  console.log(currentPlayer.leagues)
  return (
    <div>
      <h1>Manage Game</h1>

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
        label="Left Player 1"
        value={game.player_names.player_l_1 }
        defaultOption={"Select the first left player"}
        options={allPlayers.filter(function(player){
          for ( var i in player.leagues){
            if (game.league_name === player.leagues[i].value){
            return true;
            }
          }
          return false;
        })}
        onChange={onChange}
        error={errors.player_l_1}/>



      <SelectInput
        name="player_names.player_l_2"
        label="Left Player 2"
        value={game.player_names.player_l_2}
        onChange={onChange}
        defaultOption="Select the second left player"
        options={allPlayers.filter(function(player){
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
        label="Right Player 1"
        value={game.player_names.player_r_1}
        onChange={onChange}
        defaultOption="Select the first right player"
        options={allPlayers.filter(function(player){
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
        label="Right Player 2"
        value={game.player_names.player_r_2}
        onChange={onChange}
        defaultOption="Select the second right player"
        options={allPlayers.filter(function(player){
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


      <TextInput
        name="scores.left"
        label="Left Team Score"
        value={game.scores.left}
        onChange={onChange}
        error={errors.left}/>
      <TextInput
        name="scores.right"
        label="Right Team Score"
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
    </div>
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

