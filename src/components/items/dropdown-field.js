import React, {PropTypes}   from 'react';
import ItemHeader           from './item-header';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import './dropdown-field.css';

const DropdownField = ({itemName, itemText, itemStyle, onRemoveItem}) => {
  return (
    <div className="text-item">
      <ItemHeader name={itemName} onRemoveItem={onRemoveItem} />
      <div className="content" style={itemStyle}>
        <ButtonToolbar>
          <DropdownButton title="Default button" id="dropdown-size-medium">
            <MenuItem eventKey="1">Option #1</MenuItem>
            <MenuItem eventKey="2">Options #2</MenuItem>
            <MenuItem eventKey="3">Options #3</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    </div>
  );
};

DropdownField.propTypes = {
  onRemoveItem: PropTypes.func.isRequired,
  itemName:     PropTypes.string.isRequired,
  itemText:     PropTypes.string.isRequired,
  itemStyle:    PropTypes.object,
}

export default DropdownField;
