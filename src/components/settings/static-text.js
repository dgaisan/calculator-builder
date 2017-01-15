import React                from 'react';
import { connect }          from 'react-redux';
import { InputGroup, FormControl } from 'react-bootstrap';
import './../../styles/bootstrap.css';

import { changeItemName, changeItemText } from './../../actions';
import ColorPickerContainer from './../../containers/color-picker.js';

const StaticTextSettings = ({item, onTextChanged, onItemNameChanged}) => {
  return (
    <div className="text-item">
      <form>
        <InputGroup>
          <InputGroup.Addon>Item Name</InputGroup.Addon>
          <FormControl type="text"
            value={item.itemName}
            onChange={(e) => { onItemNameChanged(e.target.value, item.id); }}
            placeholder="Enter new item name..."/>
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroup.Addon>Item Text</InputGroup.Addon>
          <FormControl type="text"
            value={item.text}
            onChange={(e) => { onTextChanged(e.target.value, item.id); }}
            placeholder="Enter new item text..."/>
        </InputGroup>
      </form>
      <br />
      <ColorPickerContainer property="bgcolor"
        text="Background Color"/>
      <br />
      <ColorPickerContainer property="fontcolor"
        text="Font Color"/>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onItemNameChanged: (value, id) => (dispatch(changeItemName(value, id))),
    onTextChanged: (value, id) => (dispatch(changeItemText(value, id)))
  }
}

export default connect(null, mapDispatchToProps)(StaticTextSettings);
