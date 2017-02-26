import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeItemSettings } from './../actions';
import './../styles/bootstrap.css';
import ColorPicker from './../components/settings/color-picker';

class ColorPickerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.property = this.props.property;
    this.state = {
      color: this.props.item[ this.property] || '#0000000',
      showColorPicker: false,
    }
  }

  _handleClick = () => {
    this.setState({showColorPicker: !this.state.showColorPicker});
  }

  _handleColorChange = (color) => {
    this.setState({ color: color.hex });
    let payload = {};
    payload[ this.property] = this.state.color;
    this.props.changeColor(payload, this.props.item.id);
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
          text={this.props.text}
          onClick={this._handleClick}
          onClose={this._handleClose}
          onColorChange={this._handleColorChange} />
      </div>
    );
  }
}

ColorPickerContainer.propTypes = {
  item: PropTypes.object.isRequired,
  property: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    changeColor: (props, id) => (dispatch(changeItemSettings(props, id)))
  }
}

const mapStateToProps = state => {
  const item = state.items.find(item => (item.id === state.selectedItem));

  return { item };
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPickerContainer);
