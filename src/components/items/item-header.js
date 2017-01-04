import React, {PropTypes}   from 'react';
import                      './item-header.css';

const ItemHeader = ({name, onRemoveItem}) => {
  return (
    <div className="item-header">
      <div className="name">
        {name}
      </div>
      <span className="remove" onClick={onRemoveItem}>x</span>
    </div>
  );
}

ItemHeader.propTypes = {
  onRemoveItem: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

export default ItemHeader;
