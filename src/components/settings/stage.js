import React                from 'react';
import { connect }          from 'react-redux';
import './../../styles/bootstrap.css';
import ColorPickerContainer from './../../containers/color-picker';
import ItemSizeContainer from './../../containers/item-size';

const StageSettings = () => {
  return (
    <div className="stage-settingd">
      <ColorPickerContainer property="bgcolor"
        text="Background Color"/>
      <br />
      <ItemSizeContainer widthText="Stage Width"
        heightText="Stage Height" />
    </div>
  );
};

export default connect(null, null)(StageSettings);
