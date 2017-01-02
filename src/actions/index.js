import ActionTypes from './../constants/action-types';

const DEFAULT_HEADER_TEXT = 'Default Header';
const DEFAULT_TEXT = 'Default Text';
let nextItemId = 0;

export const addStaticText = (headerText = DEFAULT_HEADER_TEXT, text = DEFAULT_TEXT) => ({
  type: ActionTypes.ADD_STATIC_TEXT,
  headerText: headerText,
  text: text,
  id: ++nextItemId,
});

export const addNumberField = (headerText = DEFAULT_HEADER_TEXT, defaultNumber = 0.0) => ({
  type: ActionTypes.ADD_NUMBER_FIELD,
  headerText: headerText,
  defaultNumber: defaultNumber,
  id: ++nextItemId,
});

export const itemSelected = (id) => ({
  type: ActionTypes.ITEM_SELECTED,
  id: id,
});

export const changeItemHeader = (headerText = DEFAULT_HEADER_TEXT, itemId) => ({
  type: ActionTypes.CHANGE_ITEM_HEADER,
  headerText: headerText,
  id: itemId
});

export const changeItemText = (text = DEFAULT_TEXT, itemId) => ({
  type: ActionTypes.CHANGE_ITEM_TEXT,
  text: text,
  id: itemId
});
