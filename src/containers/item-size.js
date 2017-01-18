import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl, ButtonGroup, Button } from 'react-bootstrap';
import './../styles/bootstrap.css';
import { changeItemSettings } from './../actions';

const SUCCESS = 'success';
const ERROR = 'error';

/**
* This container represents 2 components handeling Item's size/dimention.
* Only integer value pass validation
*/
class ItemSizeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width,
      height: props.height
    }
  }

  isValueValid = value => ( !isNaN(value) && parseInt(value, 10) === value );

  _getValidationState = value => {
    if (this.isValueValid(value)) {
      return SUCCESS;
    }
    return ERROR;
  }

  getWidthValidationState = () => {
    return this._getValidationState(Number(this.state.width));
  };

  getHeightValidationState = () => {
    return this._getValidationState(Number(this.state.height));
  };

  widthChanged = value => {
    this.setState({width: value});
    if (this.isValueValid(Number(value))) {
      this.props.onWidthChange(parseInt(value, 10), this.props.itemId);
    }
  };

  heightChanged = value => {
    this.setState({height: value});
    if (this.isValueValid(value)) {
      this.props.onHeightChange(parseInt(value, 10), this.props.itemId);
    }
  };

  render() {
    const { widthText, heightText} = this.props;

    return (
      <form>
        <FormGroup
          controlId="widthGroup"
          validationState={this.getWidthValidationState()}>
          <InputGroup>
            <InputGroup.Addon>{widthText}</InputGroup.Addon>
            <FormControl type="text"
              value={this.state.width}
              onChange={(e) => { this.widthChanged(e.target.value); }}
              placeholder="Enter width value..."/>
            <ButtonGroup bsSize="xsmall" vertical>
              <Button>Up</Button>
              <Button>Down</Button>
            </ButtonGroup>
          </InputGroup>
        </FormGroup>
        <FormGroup
          controlId="heightGroup"
          validationState={this.getHeightValidationState()}>
          <InputGroup>
            <InputGroup.Addon>{heightText}</InputGroup.Addon>
            <FormControl type="text"
              value={this.state.height}
              onChange={(e) => { this.heightChanged(e.target.value); }}
              placeholder="Enter height value..."/>
          </InputGroup>
        </FormGroup>
      </form>
    );
  }
};

ItemSizeContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  itemId: PropTypes.number.isRequired,
  widthText: PropTypes.string,
  heightText: PropTypes.string,
  onWidthChange: PropTypes.func.isRequired,
  onHeightChange: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => {
  return {
    onWidthChange: (value, id) => (dispatch(changeItemSettings({width: value}, id))),
    onHeightChange: (value, id) => (dispatch(changeItemSettings({height: value}, id)))
  }
}

const mapStateToProps = state => {
  const item = state.items.find(item => (item.id === state.selectedItem));
  return {
    itemId: item.id,
    height: item.height,
    width: item.width,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemSizeContainer);
