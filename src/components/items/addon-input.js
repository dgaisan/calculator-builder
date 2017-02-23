import React, {PropTypes} from 'react';
import {InputGroup, FormControl} from 'react-bootstrap';
import './number-field.css';

const AddonInput = ({itemId, itemText, value = 0, onNumberChanged, placeholder = ''}) => {
  return (
    <InputGroup>
      <InputGroup.Addon>{itemText}</InputGroup.Addon>
      <FormControl type="text"
        value={value}
        onChange={ e => { onNumberChanged(e.target.value, itemId); }}
        placeholder={placeholder}/>
    </InputGroup>
  );
};

AddonInput.propTypes = {
  itemId:           PropTypes.number.isRequired,
  itemText:         PropTypes.string.isRequired,
  value:            PropTypes.number,
  onNumberChanged:  PropTypes.func.isRequired,
  placeholder:      PropTypes.string
}

export default AddonInput;
