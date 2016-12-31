import ActionTypes from './../constants/action-types';

let nextItemId = 0;

export const addStaticText = (headerText = 'DefaultHeader', text = 'Default Text') => ({
  type: ActionTypes.ADD_STATIC_TEXT,
  headerText: headerText,
  text: text,
  id: ++nextItemId,
});

export const addNumberField = (headerText = 'DefaultHeader', defaultNumber = 0.0) => ({
  type: ActionTypes.ADD_NUMBER_FIELD,
  headerText: headerText,
  defaultNumber: defaultNumber,
  id: ++nextItemId,
});

export const itemSelected = (id) => ({
  type: ActionTypes.ITEM_SELECTED,
  id: id,
});
