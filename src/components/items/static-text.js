import React, {PropTypes} from 'react';
import './static-text.css';

const TextItem = ({headerText, headerStyle, bodyText, bodyStyle, onRemoveItem}) => {
  return (
    <div className="text-item">
      <div className="header" style={headerStyle}>
        {headerText}
      </div>
      <div className="content" style={bodyStyle}>
        {bodyText}
      </div>
      <span className="remove" onClick={onRemoveItem}>x</span>
    </div>
  );
};

TextItem.propTypes = {
  onRemoveItem: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
}

export default TextItem;
