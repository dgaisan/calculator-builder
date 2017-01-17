import ItemTypes from './../constants/item-types';
import ActionTypes from './../constants/action-types';
import {getNextDefaultItem, getDefaultStage, mapNamesToItems, updateFormulaResults} from './utils';


const initialState = [ getDefaultStage() ];

const items = (state = initialState, action) => {
  let newstate = [];

  switch (action.type) {
    case ActionTypes.REMOVE_ITEM:
      newstate = state.filter(item => (item.id !== action.id));
      console.log('reducer->removing item');
      console.log(newstate);
      return newstate

    case ActionTypes.ITEM_SELECTED:
      return state.map(
        item => Object.assign({}, item, {
          isSelected: action.id === item.id ? true : false
        }));

    case ActionTypes.ADD_STATIC_TEXT:
      return [
        ...state,
        getNextDefaultItem(ItemTypes.STATIC_TEXT, action, state.length)
      ];

    case ActionTypes.ADD_NUMBER_FIELD:
      return [
        ...state,
        getNextDefaultItem(ItemTypes.NUMBER_FIELD, action, state.length)
      ];

    case ActionTypes.ADD_NUMBER_RESULT_FIELD:
      return [
        ...state,
        getNextDefaultItem(ItemTypes.NUMBER_RESULT, action, state.length)
      ];

    case ActionTypes.CHANGE_FORMULA:
      newstate = state.map(
      (item) => {
        let newItem = Object.assign({}, item);
        if (item.id === action.id) {
          newItem.formula = action.formula;
        }
        return newItem;
      });
      return updateFormulaResults(newstate, mapNamesToItems(newstate));

    case ActionTypes.CALCULATABLE_VALUE_CHANGED:
      newstate = state.map(
        (item) => {
          let newItem = Object.assign({}, item);
          if (item.id === action.id) {
            newItem.value = action.value;
          }
          return newItem;
        });

        return updateFormulaResults(newstate, mapNamesToItems(newstate));

    case ActionTypes.LAYOUT_CHANGED:
      console.log('reducer->LAYOUT_CHANGED');
      newstate = [ state.find(i => i.id === 0)];
      action.layouts.forEach(layout => {
        let item = state.find(i => i.id === parseInt(layout.i, 10));
        console.log('layout', layout);
        console.log('item', item);

        if (item) {
          item.x = layout.x;
          item.y = layout.y;
          item.w = layout.w;
          item.h = layout.h;
          newstate.push(item);
        }
      });
      console.log('newstate', newstate);
      return newstate;

    case ActionTypes.CHANGE_ITEM_HEADER:
      return state.map(
        (item) => {
          let newItem = Object.assign({}, item);
          if (item.id === action.id) {
            newItem.itemName = action.itemName;
          }
          return newItem;
        });
    case ActionTypes.CHANGE_ITEM_TEXT:
      return state.map(
        (item) => {
          let newItem = Object.assign({}, item);
          if (item.id === action.id) {
            newItem.text = action.text;
          }
          return newItem;
        });
    case ActionTypes.CHANGE_ITEM_SETTINGS:
      console.log('reducer CHANGE_ITEM_SETTINGS', action);
      return state.map(
        (item) => {
          let newItem = Object.assign({}, item);
          if (item.id === action.id) {
            Object.keys(action.props).forEach((prop) => {
              if (prop !== 'type' && prop !== 'id') {
                console.log('found a property!', prop, action.props[ prop]);
                newItem[ prop] = action.props[ prop];
              }
            });
          }
          return newItem;
        });
    default:
      return state;
  }
};

export default items;
