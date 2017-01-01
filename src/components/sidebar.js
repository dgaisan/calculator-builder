import React              from 'react';
import { connect }        from 'react-redux';
import ItemTypes          from './../constants/item-types';
import './sidebar.css';
import AddNewItem         from './addnewitem';
import StaticTextSettings from './settings/static-text';

const defaultView = () => (
  <div>
    Actual properties displayed here.
  </div>
);

let Sidebar = ({title, itemType, selectedItem}) => {
  let currentSettingsView = defaultView();

  console.log('SideBar -> itemType', itemType);
  switch (itemType) {
    case ItemTypes.STATIC_TEXT:
      currentSettingsView = StaticTextSettings;
      break;
    default:

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
  console.log('mapping state to props');
  console.log(state);
  let title = '';
  const selectedItemId = state.selectedItem;
  const selectedItem = state.items.find(item => (item.id === selectedItemId));
  const itemType = selectedItem ? selectedItem.type : selectedItem;

  switch (itemType) {
    case ItemTypes.STATIC_TEXT:
      title = 'Static Text Settings';
      break;
    default:
      title = 'Stage Settings';
  }

  return {
    title: title,
    itemType: itemType,
    selectedItem: selectedItem,
  }
}

export default connect(mapStateToProps)(Sidebar);
