import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const JoinLeagueForm = ({allLeagues,onChange,onSave,league,errors,saving}) => {
  //console.log(allLeagues)
  return (
    <div>
      <h1>Join a league</h1>

      <SelectInput
        name="uid"
        label="League Name"
        value={league.name}
        defaultOption="Select a league"
        options={allLeagues.map(function(element){
          return {
          text: element.name,
          value: element.uid
          }
        })}
        onChange={onChange} error={errors.uid}/>




      <TextInput
        name="pin"
        label="League pin"
        value={league.pin || ""}
        onChange={onChange}
        error={errors.pin}/>



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

JoinLeagueForm.propTypes = {
  league: React.PropTypes.object.isRequired,
  allLeagues: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default JoinLeagueForm;

