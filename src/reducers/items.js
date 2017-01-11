import ItemTypes from './../constants/item-types';
import ActionTypes from './../constants/action-types';
import {getNextDefaultItem, mapNamesToItems, updateFormulaResults} from './utils';


const initialState = [
  getNextDefaultItem(ItemTypes.STAGE,
    {
      id: 0,
      itemName: 'Default Header',
      text: 'Default Text',
      formula: '',
      value: 0.0,
    }, 0)
];

const items = (state = initialState, action) => {
  switch (action.type) {
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
      const newState = state.map(
      (item) => {
        let newItem = Object.assign({}, item);
        if (item.id === action.id) {
          newItem.formula = action.formula;
        }
        return newItem;
      });
      return updateFormulaResults(newState, mapNamesToItems(newState));
    case ActionTypes.CALCULATABLE_VALUE_CHANGED:
      console.log('reducer CALCULATABLE_VALUE_CHANGED');
      console.log(state); console.log(action);
      const ns = state.map(
        (item) => {
          let newItem = Object.assign({}, item);
          if (item.id === action.id) {
            newItem.value = action.value;
          }
          return newItem;
        });

        return updateFormulaResults(ns, mapNamesToItems(ns));
    case ActionTypes.LAYOUT_CHANGED:
      return state;
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
