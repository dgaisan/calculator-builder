import React, { PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import './../../styles/bootstrap.css';
import Align from './../../constants/settings';

const TextAlign = ({leftText, middleText, rightText, selected, onClick}) => {
  const selectedStyle = {
    backgroundColor: '#e6e6e6'
  }

  return (
    <ButtonGroup>
      <Button style={selected === Align.LEFT ? selectedStyle : {}}
        onClick={()=>{ onClick(Align.LEFT); }}>{leftText}</Button>
      <Button style={selected === Align.CENTER ? selectedStyle : {}}
        onClick={()=>{ onClick(Align.CENTER); }}>{middleText}</Button>
      <Button style={selected === Align.RIGHT ? selectedStyle : {}} 
        onClick={()=>{ onClick(Align.RIGHT); }}>{rightText}</Button>
    </ButtonGroup>
  );
};

TextAlign.propTypes = {
  leftText: PropTypes.string.isRequired,
  middleText: PropTypes.string.isRequired,
  rightText: PropTypes.string.isRequired,
  selected: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};


export default TextAlign;
