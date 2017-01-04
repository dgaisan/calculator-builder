import ActionTypes from './../constants/action-types';

const DEFAULT_STATIC_TEXT = 'Static Text Item';
const DEFAULT_TEXT = 'Default Text';
const _generateItemName = () => ('Item' + Math.random() * 2500);
let nextItemId = 0;

export const addStaticText = () => ({
  type: ActionTypes.ADD_STATIC_TEXT,
  id: ++nextItemId,
  itemName: DEFAULT_STATIC_TEXT,
  text: DEFAULT_TEXT,
});

export const addNumberField = (number = 0.0) => ({
  type: ActionTypes.ADD_NUMBER_FIELD,
  id: ++nextItemId,
  itemName: 'number' + nextItemId,
  value: number,
  text: DEFAULT_TEXT,
});

export const itemSelected = (id) => ({
  type: ActionTypes.ITEM_SELECTED,
  id: id,
});

export const changeItemName = (itemName = _generateItemName(), itemId) => ({
  type: ActionTypes.CHANGE_ITEM_HEADER,
  itemName: itemName,
  id: itemId,
});

export const changeItemText = (text = DEFAULT_TEXT, itemId) => ({
  type: ActionTypes.CHANGE_ITEM_TEXT,
  text: text,
  id: itemId,
});

export const changeLayout = (layouts) => ({
  type: ActionTypes.LAYOUT_CHANGED,
  layouts: layouts,
});
