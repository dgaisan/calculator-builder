import React                from 'react';
import { connect }          from 'react-redux';
import { changeItemHeader, changeItemText } from './../../actions';

const StaticTextSettings = ({item, onTextChanged, onHeaderChanged}) => {
  let headerInput, textInput;

  return (
    <div className="text-item">
      <div>
        <p>Header Text</p>
        <input type="text" value={item.headerText}
          ref={node => { headerInput = node; }}
          onChange={() => { onHeaderChanged(headerInput.value, item.id); }}
          placeholder="Enter new header text" />
      </div>
      <br />
      <div>
        <p>Body Text</p>
        <input type="text" value={item.text}
          ref={node => { textInput = node; }}
          onChange={() => { onTextChanged(textInput.value, item.id); }}
          placeholder="Enter new body text" />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onHeaderChanged: (value, id) => (dispatch(changeItemHeader(value, id))),
    onTextChanged: (value, id) => (dispatch(changeItemText(value, id)))
  }
}

export default connect(null, mapDispatchToProps)(StaticTextSettings);
