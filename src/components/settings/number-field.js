import React                from 'react';
import { connect }          from 'react-redux';
import { changeItemName, changeItemText, changeInputOrderedFirst } from './../../actions';
import { InputGroup, FormControl, Checkbox } from 'react-bootstrap';
import './../../styles/bootstrap.css';
import ColorPickerContainer from './../../containers/color-picker.js';
import NumericStepperContainer from './../../containers/numeric-stepper';

const NumberFieldSettings = ({
  item,
  onTextChanged,
  onItemNameChanged,
  onInputOrderChanged}) => {

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
      <ColorPickerContainer property="label_fontcolor"
        text="Label Font Color"/>
      <br />
      <ColorPickerContainer property="input_backgroundColor"
        text="Input Field Background Color"/>
      <br />
      <ColorPickerContainer property="fontcolor"
        text="Input Font Color"/>
      <br />
      <Checkbox
        checked={item.inputFirst}
        onChange={e => { onInputOrderChanged(e.target.checked, item.id);}}>
        Input First, Label second
      </Checkbox>
      <br />
      <NumericStepperContainer
        title="Font Size"
        placeholderText="Enter Font Size"
        propertyName="fontSize"
        min={4}
        max={99}
        step={1} />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onItemNameChanged: (value, id) => (dispatch(changeItemName(value, id))),
    onTextChanged: (value, id) => (dispatch(changeItemText(value, id))),
    onInputOrderChanged: (value, id) => (dispatch(changeInputOrderedFirst(value, id)))
  }
}

export default connect(null, mapDispatchToProps)(NumberFieldSettings);
