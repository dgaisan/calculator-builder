import ItemTypes from './../constants/item-types';
import ActionTypes from './../constants/action-types';


const initialState = [
  {
    id: 0,
    type: ItemTypes.STAGE,
    isSelected: true,
    bgcolor: '#cecece',
    width: '600',
    height: '900',
  }
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
        {
          type: ItemTypes.STATIC_TEXT,
          id: action.id,
          text: action.text,
          headerText: action.headerText,
        }
      ]
    default:
      return state;
  }
};

export default items;
