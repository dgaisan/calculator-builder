import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeItemSettings } from './../actions';
import NumericStepper from './../components/settings/numeric-stepper';

const SUCCESS = 'success';
const ERROR = 'error';

class NumericStepperContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: String(props.item[ props.propertyName] || 0)
    }
  }

  isNumber = value => (!isNaN(value) && parseInt(value, 10) === value);

  isValueValid = value => {
    let result = true;
    const {max, min} = this.props;

    result = result && this.isNumber;

    if (typeof max === 'number') {
      result = result && (value <= max);
    }
    if (typeof min === 'number') {
      result = result && (value >= min);
    }

    return result;
  };

  getValidationState = () => {
    if (this.isValueValid(Number(this.state.value))) {
      return SUCCESS;
    }
    return ERROR;
  };

  handleValueChanged = value => {
    this.setState({value: value});
    if (this.isValueValid(Number(value))) {
      this.props.onValueChange({[this.props.propertyName]: parseInt(value, 10)}, this.props.itemId);
    }
  };

  handleUp = () => {
    const {step = 1, max = 1200} = this.props;
    const value = Number(this.state.value);

    if (this.isNumber(value) && value + step <= max) {
      this.handleValueChanged(String(value + step));
    }
  };

  handleDown = () => {
    const {step = 1, min = 0} = this.props;
    const value = Number(this.state.value);

    if (this.isNumber(value) && value + step >= min) {
      this.handleValueChanged(String(value - step));
    }
  };

  render() {
    const { title, placeholderText } = this.props;
    return (
      <form>
        <NumericStepper
          title={title}
          placeholderText={placeholderText || ''}
          value={this.state.value}
          validationState={ this.getValidationState() }
          onChange={(e) => { e.preventDefault(); this.handleValueChanged(e.target.value); }}
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
