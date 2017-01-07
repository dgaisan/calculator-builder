import React, {PropTypes} from 'react';
import { SketchPicker } from 'react-color';
import './../../styles/bootstrap.css';
import './color-picker.css';
import bgColorIcon from './../../resources/background-color-icon.png';

const ColorPicker = ({color, show, text, onClick, onClose, onColorChange}) => {
  const style = { backgroundColor: color};
  let colorPickerPalette = null;

  if (show) {
    colorPickerPalette =
      <div className="color-picker-popover">
        <div className="color-picker-cover" onClick={onClose} />
        <SketchPicker
          color={color}
          onChangeComplete={onColorChange} />
      </div>
  }

  return (
    <div className="row color-picker">
      <div className="col-md-3">
        <img src={bgColorIcon} className="bg-icon" alt="logo" />
      </div>
      <div className="col-md-6">
        <p>{text}</p>
      </div>
      <div className="col-md-3">
        <div className="color-picker-wrap" onClick={onClick}>
          <div className="color-picker-color" style={style} />
          {colorPickerPalette}
        </div>
      </div>
    </div>
  );
};

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onColorChange: PropTypes.func.isRequired,
}

ColorPicker.defaultProps = {
  color: '#000000',
  show: false,
  text: 'Background Color',
};

export default ColorPicker;
