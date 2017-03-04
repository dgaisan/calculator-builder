import React, {PropTypes}   from 'react';
import './number-field.css';
import ItemHeader           from './item-header';

const ResultItem = ({
  itemName,
  itemText,
  result,
  item,
  itemStyle,
  onRemoveItem }) => {

  let resultString = '';

  if (!item.labelHidden) {
    resultString += itemText + ' ';
  }
  resultString += result;

  return (
    <div className="number-item">
      <ItemHeader name={itemName} onRemoveItem={onRemoveItem} />
      <div className="content" style={itemStyle}>
        {resultString}
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
  item:             PropTypes.object.isRequired
};

export default ResultItem;
