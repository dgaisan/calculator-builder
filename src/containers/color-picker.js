import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { changeItemSettings } from './../actions';
import './../styles/bootstrap.css';
import ColorPicker from './../components/settings/color-picker';

class ColorPickerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.bgColor || '#0000000',
      showColorPicker: false,
    }
  }

  _handleClick = () => {
    this.setState({showColorPicker: !this.state.showColorPicker});
  }

  _handleColorChange = (color) => {
    this.setState({ color: color.hex });
    this.props.changeColor({bgcolor: this.state.color}, this.props.itemId);
  }

  _handleClose = () => {
    this.setState({showColorPicker: false});
  }

  render() {
    return (
      <div>
        <ColorPicker
          color={this.state.color}
          show={this.state.showColorPicker}
          text="Background Color"
          onClick={this._handleClick}
          onClose={this._handleClose}
          onColorChange={this._handleColorChange} />
      </div>
    );
  }
}

ColorPickerContainer.propTypes = {
  bgColor: PropTypes.string.isRequired,
  itemId: PropTypes.number.isRequired,
}

const mapDispatchToProps = dispatch => {
  return {
    changeColor: (props, id) => (dispatch(changeItemSettings(props, id)))
  }
}

const mapStateToProps = state => {
  const item = state.items.find(item => (item.id === state.selectedItem));
  return {
    bgColor: item.bgcolor,
    itemId: item.id,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPickerContainer);
