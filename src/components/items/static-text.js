import React, {PropTypes}   from 'react';
import                      './static-text.css';
import ItemHeader           from './item-header';

const TextItem = ({itemName, itemText, itemStyle, onRemoveItem}) => {
  return (
    <div className="text-item">
      <ItemHeader name={itemName} onRemoveItem={onRemoveItem} />
      <div className="content" style={itemStyle}>
        {itemText}
      </div>
    </div>
  );
};

TextItem.propTypes = {
  onRemoveItem: PropTypes.func.isRequired,
  itemName:     PropTypes.string.isRequired,
  itemText:     PropTypes.string.isRequired,
  itemStyle:    PropTypes.object,
}

export default TextItem;
