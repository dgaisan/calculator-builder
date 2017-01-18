import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl, ButtonGroup, Button } from 'react-bootstrap';
import { changeItemSettings } from './../actions';
import NumericStepper from './../components/settings/numeric-stepper';

const SUCCESS = 'success';
const ERROR = 'error';

class NumericStepperContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.item[ props.propertyName] || 0
    }
    this.placeholder = placeholderText || '';
  }

  isValueValid = value => {
    let result = true;
    const {max, mix} = this.props;

    // validating that value is number
    result = result && !isNaN(value) && parseInt(value, 10) === value;

    if (typeof max === 'number') {
      result = result && result <= max;
    }
    if (typeof min === 'number') {
      result = result && result >= min;
    }

    return result;
  }

  getValidationState = () => {
    if (this.isValueValid(Number(this.state.value))) {
      return SUCCESS;
    }
    return ERROR;
  };

  handleValueChanged = value => {
    this.setState({value: value});
    if (this.isValueValid(Number(value))) {
      this.props.onValueChange({this.props.propertyName: parseInt(value, 10)}, this.props.itemId);
    }
  };

  handleUp = () => {
    this.handleValueChanged(this.state.value + 1);
  }

  handleDown = () => {
    this.handleValueChanged(this.state.value - 1);
  }

  render() {
    const { title, placeholderText } = this.props;

    return (
      <form>
        <NumericStepper
          title={title}
          placeholderText={placeholderText || ''}
          value={this.state.value}
          validationState={ this.getValidationState(); }
          onChange={(e) => { this.handleValueChanged(e.target.value); }}
          onUp={this.handleUp}
          onDown={this.handleDown} />
      </form>
    );
  }
};

NumericStepperContainer.propTypes = {
  title: PropTypes.string.isRequired,
  placeholderText: PropTypes.string,
  propertyName: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
}

const mapDispatchToProps = dispatch => {
  return {
    onValueChange: (prop, id) => (dispatch(changeItemSettings(prop, id)))
  }
}

const mapStateToProps = state => {
  const item = state.items.find(item => (item.id === state.selectedItem));
  return {
    itemId: item.id,
    item: item,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NumericStepperContainer);
