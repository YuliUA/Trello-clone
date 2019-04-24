import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    addText,
    error,
    info,
    type,
    onChange,
    disabled
})=>(
    <div className="form-group">
        <label htmlFor={name} >{label} <span className="text-secondary">{addText}</span></label>
        <input
        type={type}
        className={classnames('form-control form-control-lg bg-light',{'is-valid':error})}
        placeholder={placeholder}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        />
        {info && <small className="form-text text-muted">{info}</small>}
        {error && <div className="invalid-feedback">{error}</div>} 
    
        {error && <div className="text-danger">{error}</div>}
    </div>
);

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
  };
  
  TextFieldGroup.defaultProps = {
    type: 'text',
  };
  
  export default TextFieldGroup;
  