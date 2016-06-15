import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const GameForm = ({game, allPlayers, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Manage Game</h1>

      <SelectInput
        name="game_type"
        label="Game Type"
        value={game.game_type}
        defaultOption="Select a game type"
        options={[{value: 1, text: "Singles"},{value: 2, text: "Doubles"}]}
        onChange={onChange} error={errors.game_type}/>

      <TextInput
        name="player_names.player_l_1"
        label="Left Player 1"
        value={game.player_names.player_l_1}
        onChange={onChange}
        error={errors.player_l_1}/>

      <TextInput
        name="player_names.player_l_2"
        label="Left Player 2"
        value={game.player_names.player_l_2}
        onChange={onChange}
        error={errors.player_l_2}
        disabled={game.game_type -2}
      />

      <TextInput
        name="player_names.player_r_1"
        label="Right Player 1"
        value={game.player_names.player_r_1}
        onChange={onChange}
        error={errors.player_r_1}/>
      <TextInput
        name="player_names.player_r_2"
        label="Right Player 2"
        value={game.player_names.player_r_2}
        onChange={onChange}
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
    </form>
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
