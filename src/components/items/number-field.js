import React, {PropTypes}   from 'react';
import                      './number-field.css';
import ItemHeader           from './item-header';
import InputAddon from './input-addon';
import AddonInput from './addon-input';

const NumberItem = ({item, itemName, itemText, number, itemStyle, onNumberChanged, onRemoveItem}) => {
  let inputField;
  if (item.inputFirst) {
    inputField =
      <InputAddon
        itemId={item.id}
        itemText={itemText}
        value={number}
        onNumberChanged={(val, id) => { onNumberChanged(val, id); }}
        placeholder="Enter a number"
      />;
  } else {
    inputField =
      <AddonInput
        itemId={item.id}
        itemText={itemText}
        value={number}
        onNumberChanged={(val, id) => { onNumberChanged(val, id); }}
        placeholder="Enter a number"
      />;
  }

  return (
    <div className="number-item">
      <ItemHeader name={itemName} onRemoveItem={onRemoveItem} />
      <div className="content" style={itemStyle}>
        {inputField}
      </div>
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
  itemStyle:        PropTypes.object,
}

export default NumberItem;
