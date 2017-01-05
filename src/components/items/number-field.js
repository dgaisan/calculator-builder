import React, {PropTypes}   from 'react';
import                      './number-field.css';
import ItemHeader           from './item-header';

const NumberItem = ({item, itemName, itemText, number, onNumberChanged, onRemoveItem}) => {
  let numberInput;

  return (
    <div className="number-item">
      <ItemHeader name={itemName} onRemoveItem={onRemoveItem} />
      <div className="content">
        <p>{itemText}</p>
        <input type="text" value={item.number}
            ref={node => { numberInput = node; }}
            onChange={() => {onNumberChanged(numberInput.value, item.id)}}
        />
      </div>
      <span className="remove" onClick={onRemoveItem}>x</span>
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
