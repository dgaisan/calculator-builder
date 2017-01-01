import ActionTypes from './../constants/action-types';


const selectedItem = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.ITEM_SELECTED:
      return action.id;
    default:
      return state;
  }
}

export default selectedItem;
