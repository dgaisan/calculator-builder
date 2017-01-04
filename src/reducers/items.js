import ItemTypes from './../constants/item-types';
import ActionTypes from './../constants/action-types';


const getNextDefaultItem = (type, action, numberOfCurrentItems) => {
  let ret = {
    id: action.id,
    type: type,
    itemName: action.itemName,
    text: action.text,
    value: action.value,
    isSelected: true,
    bgcolor: '#cecece',
    w: 12,
    h: 1,
    x: 0,
    y: numberOfCurrentItems + 1,
  }

  return ret;
}

const initialState = [
  getNextDefaultItem(ItemTypes.STAGE, {id: 0, itemName: 'Default Header', text: 'Default Text', value: 0.0}, 0)
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
    default:
      return state;
  }
};

export default items;
