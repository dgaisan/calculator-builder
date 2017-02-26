import React, {PropTypes}   from 'react';
import './number-field.css';
import ItemHeader           from './item-header';

const ResultItem = ({
  itemName,
  itemText,
  result,
  itemStyle,
  onRemoveItem }) => {

  return (
    <div className="number-item">
      <ItemHeader name={itemName} onRemoveItem={onRemoveItem} />
      <div className="content" style={itemStyle}>
        {itemText} {result}
      </div>
      <span className="remove" onClick={onRemoveItem}>x</span>
    </div>
  );
};

ResultItem.propTypes = {
  onRemoveItem:     PropTypes.func.isRequired,
  itemName:         PropTypes.string,
  itemText:         PropTypes.string.isRequired,
  result:           PropTypes.number.isRequired,
  itemStyle:        PropTypes.object,
}

export default ResultItem;
