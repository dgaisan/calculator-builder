import { combineReducers } from 'redux';
import itemsReducer from './items';
import selectedItem from './selected-item';


const calcBuilderApp = combineReducers({
   items: itemsReducer,
   selectedItem: selectedItem,
 });

export default calcBuilderApp;
