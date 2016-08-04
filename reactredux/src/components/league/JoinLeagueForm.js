import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const JoinLeagueForm = ({allLeagues,onChange,onSave,league,errors,saving}) => {
  //console.log(allLeagues)
  return (
    <div className="container-fluid">
            <div className="hero-inner">
                <div className="container">
                    <h1>Join A League</h1>
                </div>
            </div>
        <div className="container inner">
      <SelectInput
        name="uid"
        label="League Name"
        value={league.name}
        defaultOption="Select a league"
        options={allLeagues.sort(function(a, b){
          return a.name.toLowerCase() > b.name.toLowerCase();

        }).map(function(element){
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
        value={saving ? 'Adding...' : 'Join league'}
        className="btn btn-primary"
        onClick={onSave}
      />
    </div></div>
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

