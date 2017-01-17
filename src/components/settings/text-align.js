import React, { PropTypes } from 'react';
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import Align from './../../constants/settings';

const TextAlign = ({selected, onClick}) => {
  const selectedStyle = {
    backgroundColor: '#e6e6e6'
  }

  return (
    <ButtonToolbar>
      <ButtonGroup>
        <Button style={selected === Align.LEFT ? selectedStyle : {}}
          onClick={()=>{ onClick(Align.LEFT); }}><Glyphicon glyph="align-left" /></Button>
        <Button style={selected === Align.CENTER ? selectedStyle : {}}
          onClick={()=>{ onClick(Align.CENTER); }}><Glyphicon glyph="align-center" /></Button>
        <Button style={selected === Align.RIGHT ? selectedStyle : {}}
          onClick={()=>{ onClick(Align.RIGHT); }}><Glyphicon glyph="align-justify" /></Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
};

TextAlign.propTypes = {
  selected: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};


export default TextAlign;
