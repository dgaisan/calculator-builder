import React, {PropTypes}   from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import                      './number-field.css';
import ItemHeader           from './item-header';

const NumberItem = ({item, itemName, itemText, number, onNumberChanged, onRemoveItem}) => {
  return (
    <div className="number-item">
      <ItemHeader name={itemName} onRemoveItem={onRemoveItem} />
      <InputGroup>
        <InputGroup.Addon>{itemText}</InputGroup.Addon>
        <FormControl type="text"
          value={number}
          onChange={(e) => { onNumberChanged(e.target.value, item.id); }}
          placeholder="Enter a number"/>
      </InputGroup>
    </div>
  );
};

NumberItem.propTypes = {
  onNumberChanged:  PropTypes.func.isRequired,
  onRemoveItem:     PropTypes.func.isRequired,
  itemName:         PropTypes.string,
  itemText:         PropTypes.string.isRequired,
  number:           PropTypes.number,
  item:             PropTypes.object.isRequired,
}

export default NumberItem;
