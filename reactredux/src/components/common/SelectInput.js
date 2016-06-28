import React, {PropTypes} from 'react';

const SelectInput = ({name, label, onChange, defaultOption, defaultValue, value, error, options, disabled}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">{}
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="form-control"
            disabled={disabled}>
            <option key={defaultValue} value={defaultValue}>{defaultOption}</option>
            {options.map((option) => {
              //console.log(option);
              return <option key={option.value} value={option.value}>{option.text}</option>;

            })
            }
          </select>
        {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.number
};

export default SelectInput;
