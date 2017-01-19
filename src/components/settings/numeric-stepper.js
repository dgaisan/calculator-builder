import React, { PropTypes } from 'react';
import { FormGroup, InputGroup, FormControl, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

const NumericStepper = ({title, placeholderText, value, validationState, onChange, onUp, onDown}) => {

  const textFormStyle = {
    height: '36px',
  };
  const stepperGroupStyle = {
    display: 'table-cell',
  };
  const stepperButtonsStyle = {
    padding: '0px',
    margin: '0px',
    border: '0px',
  }

  return (
    <FormGroup
      controlId="numeric-control"
      validationState={validationState}>
      <InputGroup>
        <InputGroup.Addon>{title}</InputGroup.Addon>
        <FormControl type="text"
          style={textFormStyle}
          value={value}
          onChange={onChange}
          placeholder={placeholderText}/>
        <ButtonGroup vertical bsSize="xsmall" style={stepperGroupStyle}>
          <Button onClick={onUp} style={stepperButtonsStyle}>
            <Glyphicon glyph="glyphicon glyphicon-chevron-up"/>
          </Button>
          <Button onClick={onDown} style={stepperButtonsStyle}>
            <Glyphicon glyph="glyphicon glyphicon-chevron-down"/>
          </Button>
        </ButtonGroup>
      </InputGroup>
    </FormGroup>
  );
};

NumericStepper.propTypes = {
  title: PropTypes.string.isRequired,
  placeholderText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  validationState: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onUp: PropTypes.func.isRequired,
  onDown: PropTypes.func.isRequired,
}

export default NumericStepper;
