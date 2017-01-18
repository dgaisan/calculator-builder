import React, { PropTypes } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

const DropdownComponent = ({title, id, options, onSelect}) => {
  let optionElements = options.map((item, index) => (
    <MenuItem key={index} eventKey={item.name}>{item.name}</MenuItem>
  ));
  return (
    <ButtonToolbar>
      <DropdownButton onSelect={onSelect} title={title} id={id}>
        {optionElements}
      </DropdownButton>
    </ButtonToolbar>
  );
}

DropdownComponent.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: PropTypes.string
    })
  ),
  onSelect: PropTypes.func.isRequired,
};

export default DropdownComponent;
