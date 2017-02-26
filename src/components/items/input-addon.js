import React, {PropTypes} from 'react';
import {InputGroup, FormControl} from 'react-bootstrap';
import './number-field.css';

const InputAddon = ({
  itemId,
  itemText,
  inputStyle,
  labelStyle,
  value = 0,
  onNumberChanged,
  placeholder = ''}) => {

  return (
    <InputGroup>
      <FormControl type="text"
        value={value}
        style={inputStyle}
        onChange={ e => { onNumberChanged(e.target.value, itemId); }}
        placeholder={placeholder}/>
        <InputGroup.Addon style={labelStyle}>
          {itemText}
        </InputGroup.Addon>
    </InputGroup>
  );
};

InputAddon.propTypes = {
  itemId:           PropTypes.number.isRequired,
  itemText:         PropTypes.string.isRequired,
  inputStyle:       PropTypes.object,
  labelStyle:       PropTypes.object,
  value:            PropTypes.number,
  onNumberChanged:  PropTypes.func.isRequired,
  placeholder:      PropTypes.string
}

export default InputAddon;
