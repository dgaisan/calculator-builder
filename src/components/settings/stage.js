import React                from 'react';
import { connect }          from 'react-redux';
import './../../styles/bootstrap.css';
import ColorPickerContainer from './../../containers/color-picker.js'

const StageSettings = () => {
  return (
    <div className="stage-settingd">
      <ColorPickerContainer property="bgcolor"
        text="Background Color"/>
      <br />
    </div>
  );
};

export default connect(null, null)(StageSettings);
