import React, {PropTypes}   from 'react';
import ItemHeader           from './item-header';
import './dropdown-field.css';

const DropdownField = ({itemName, itemText, itemStyle, onRemoveItem}) => {
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

export default DropdownField;
