import React from 'react';
import { connect } from 'react-redux';
import {addStaticText, addNumberField} from './../actions';

let InsertNewItem = ({dispatch, onClose}) => {
  const _handleStaticText = (e) => {
    e.preventDefault();
    console.log('Adding STatic text');
    dispatch(addStaticText());
    onClose(e);
  };

  const _handleNumberField = (e) => {
    e.preventDefault();
    console.log('Adding Number field');
    dispatch(addNumberField());
    onClose(e);
  };

  return (
    <div>
      <p>Select Item Type to Insert on Stage</p>
      <button onClick={_handleStaticText}>Add Static Text</button>
      <button onClick={_handleNumberField}>Add Number Field</button>
    </div>
  );
};
InsertNewItem = connect()(InsertNewItem);

export default InsertNewItem;
