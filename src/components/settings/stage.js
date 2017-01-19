import React                from 'react';
import { connect }          from 'react-redux';
import './../../styles/bootstrap.css';
import ColorPickerContainer from './../../containers/color-picker';
import NumericStepperContainer from './../../containers/numeric-stepper';

const StageSettings = () => {
  return (
    <div className="stage-settingd">
      <ColorPickerContainer property="bgcolor"
        text="Background Color"/>
      <br />

      <NumericStepperContainer
        title="Stage Width"
        placeholderText="Enter Stage Width"
        propertyName="width"
        min={10}
        max={1200}
        step={1} />
      <NumericStepperContainer
        title="Stage Height"
        placeholderText="Enter Stage Height"
        propertyName="height"
        min={10}
        max={800}
        step={1} />
    </div>

  );
};

export default connect(null, null)(StageSettings);
