import React, { PropTypes } from 'react';
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import {Thickness} from './../../constants/settings';

const TextThickness = ({isBold, isItalic, isUnderscore, onClick}) => {
  const selectedStyle = {
    backgroundColor: '#e6e6e6'
  }

  return (
    <ButtonToolbar>
      <ButtonGroup>
        <Button style={isBold ? selectedStyle : {}}
          onClick={(e)=>{ onClick(Thickness.BOLD); }}>
          <Glyphicon glyph="glyphicon glyphicon-bold" />
        </Button>
        <Button style={isItalic ? selectedStyle : {}}
          onClick={()=>{ onClick(Thickness.ITALIC); }}>
          <Glyphicon glyph="glyphicon glyphicon-italic" />
        </Button>
        <Button style={isUnderscore ? selectedStyle : {}}
          onClick={()=>{ onClick(Thickness.UNDERSCORE); }}>
          <Glyphicon glyph="glyphicon glyphicon-text-color" />
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
};

TextThickness.propTypes = {
  isBold: PropTypes.bool.isRequired,
  isItalic: PropTypes.bool.isRequired,
  isUnderscore: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TextThickness;
