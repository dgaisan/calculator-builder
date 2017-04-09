import React from 'react';
import { connect } from 'react-redux';
import {addStaticText, addNumberField, addNumberResultField, addDropdownField} from './../actions';

let InsertNewItem = ({dispatch, onClose}) => {
  const handleDispatch = (e, actionCreator) => {
    e.preventDefault();
    dispatch(actionCreator());
    onClose(e);
  }

  const handleStaticText = (e) => {
    handleDispatch(e, addStaticText);
  };

  const handleNumberField = (e) => {
    handleDispatch(e, addNumberField);
  };

  const handleNumberResultField = (e) => {
    handleDispatch(e, addNumberResultField);
  };

  const handleDropdownField = (e) => {
    handleDispatch(e, addDropdownField);
  };

  return (
    <div>
      <p>Select Item Type to Insert on Stage</p>
      <button onClick={handleStaticText}>Add Static Text</button>
      <button onClick={handleNumberField}>Add Number Field</button>
      <button onClick={handleNumberResultField}>Add Number Result Field</button>
      <button onClick={handleDropdownField}>Add Dropdown Field</button>
    </div>
  );
};
InsertNewItem = connect()(InsertNewItem);

export default InsertNewItem;
