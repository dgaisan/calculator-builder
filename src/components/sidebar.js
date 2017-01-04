import React              from 'react';
import { connect }        from 'react-redux';
import ItemTypes          from './../constants/item-types';

import './sidebar.css';
import AddNewItem         from './addnewitem';
import StaticTextSettings from './settings/static-text';
import NumberFieldSettings from './settings/number-field';
import NumberResultSettings from './settings/number-result';

const defaultView = () => (
  <div>
    Actual properties displayed here.
  </div>
);

let Sidebar = ({itemType, selectedItem}) => {
  let currentSettingsView = defaultView();
  let title = '';

  switch (itemType) {
    case ItemTypes.STATIC_TEXT:
      title = 'Static Text Settings';
      currentSettingsView = <StaticTextSettings item={selectedItem} />;
      break;
    case ItemTypes.NUMBER_FIELD:
      title = 'Number Field Settings';
      currentSettingsView = <NumberFieldSettings item={selectedItem} />;
      break;
    case ItemTypes.NUMBER_RESULT:
      title = 'Number Result Settings';
      currentSettingsView = <NumberResultSettings item={selectedItem} />;
      break;
    default:
      title = 'Stage Settings';
  }

  return (
    <div className="sidebar-container">
      <AddNewItem />
      <hr />
      <h2>{title}</h2>
      {currentSettingsView}
    </div>
  );
};

const mapStateToProps = (state) => {
  const selectedItemId = state.selectedItem;
  const selectedItem = state.items.find(item => (item.id === selectedItemId));
  const itemType = selectedItem ? selectedItem.type : selectedItem;

  return {
    itemType: itemType,
    selectedItem: selectedItem,
  }
}

export default connect(mapStateToProps)(Sidebar);
