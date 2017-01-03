import React, {PropTypes}   from 'react';
import                      './number-field.css';

const NumberItem = ({item, headerText, number, onNumberChanged, onRemoveItem}) => {
  let numberInput;

  return (
    <div className="number-item">
      <div className="header">
        {headerText}
      </div>
      <div className="content">
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
  headerText:       PropTypes.string.isRequired,
  number:           PropTypes.number.isRequired,
}

export default NumberItem;
