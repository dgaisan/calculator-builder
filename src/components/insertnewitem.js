import React from 'react';
import { connect } from 'react-redux';
import {addStaticText, addNumberField, addNumberResultField} from './../actions';

let InsertNewItem = ({dispatch, onClose}) => {
  const _handleDispatch = (e, actionCreator) => {
    e.preventDefault();
    dispatch(actionCreator());
    onClose(e);
  }

  const _handleStaticText = (e) => {
    _handleDispatch(e, addStaticText);
  };

  const _handleNumberField = (e) => {
    _handleDispatch(e, addNumberField);
  };

  const _handleNumberResultField = (e) => {
    _handleDispatch(e, addNumberResultField);
  };

  return (
    <div>
      <p>Select Item Type to Insert on Stage</p>
      <button onClick={_handleStaticText}>Add Static Text</button>
      <button onClick={_handleNumberField}>Add Number Field</button>
      <button onClick={_handleNumberResultField}>Add Number Result Field</button>
    </div>
  );
};
InsertNewItem = connect()(InsertNewItem);

export default InsertNewItem;
