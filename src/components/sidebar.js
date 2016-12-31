import React from 'react';
import './sidebar.css';
import AddNewItem from './addnewitem';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <AddNewItem />
      <div>
        Actual properties displayed here!
      </div>
    </div>
  );
};

export default Sidebar;
