import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const CreateLeagueForm = ({allLeagues,onChange,onSave,league,errors,saving}) => {
  //console.log(allLeagues)
  return (
    <div>
      <h1>Create a league</h1>

      <TextInput
        name="name"
        label="League Name"
        value={league.name || ""}
        onChange={onChange}
        error={errors.name}/>




      <TextInput
        name="pin"
        label="League pin"
        value={league.pin || ""}
        onChange={onChange}
        error={errors.pin}/>



      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Creating...' : 'Create league'}
        className="btn btn-primary"
        onClick={onSave}
      />
    </div>
  );
};

CreateLeagueForm.propTypes = {
  league: React.PropTypes.object.isRequired,
  allLeagues: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default CreateLeagueForm;

