import { combineReducers } from 'redux';
import itemsReducer from './items';
import visibilityFilter from './items0';


const calcBuilderApp = combineReducers({
   items: itemsReducer,
   filter: visibilityFilter, // For testing purpose
 });

export default calcBuilderApp;
