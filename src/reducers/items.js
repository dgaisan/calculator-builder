import ItemTypes from './../constants/item-types';
import ActionTypes from './../constants/action-types';


const getNextDefaultItem = (id, type, header, text, numberOfCurrentItems) => {
  return {
    id: id,
    type: type,
    headerText: header,
    text: text,
    isSelected: true,
    bgcolor: '#cecece',
    w: 12,
    h: 1,
    x: 0,
    y: numberOfCurrentItems + 1,
  }
}

const initialState = [
  getNextDefaultItem(0, ItemTypes.STAGE, 'Default Header', 'Default Text', 0)
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
        getNextDefaultItem(action.id, ItemTypes.STATIC_TEXT, action.headerText, action.text, state.length)
      ];
    case ActionTypes.ADD_NUMBER_FIELD:
      return [
        ...state,
        getNextDefaultItem(action.id, ItemTypes.NUMBER_FIELD, action.headerText, action.text, state.length)
      ];
    case ActionTypes.CHANGE_ITEM_HEADER:
      return state.map(
        (item) => {
          let newItem = Object.assign({}, item);
          if (item.id === action.id) {
            newItem.headerText = action.headerText;
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
