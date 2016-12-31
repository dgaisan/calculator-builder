import { combineReducers } from 'redux';
import itemsReducer from './items';


// const calcBuilderApp = combineReducers({
//   itemsReducer,
// });

const calcBuilderApp = itemsReducer;

export default calcBuilderApp;
