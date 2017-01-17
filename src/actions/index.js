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

export const addNumberResultField = (formula = '') => ({
  type: ActionTypes.ADD_NUMBER_RESULT_FIELD,
  id: ++nextItemId,
  itemName: 'result' + nextItemId,
  formula: formula,
  value: 0.0,
  text: DEFAULT_TEXT,
});

export const removeItem = id => ({
  type: ActionTypes.REMOVE_ITEM,
  id: id,
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

export const changeItemSettings = (props = {}, itemId) => ({
  type: ActionTypes.CHANGE_ITEM_SETTINGS,
  id: itemId,
  props: props,
});

export const changeFormula = (formula = '', itemId) => ({
  type: ActionTypes.CHANGE_FORMULA,
  formula: formula,
  id: itemId,
});

export const layoutChanged = (layouts) => ({
  type: ActionTypes.LAYOUT_CHANGED,
  layouts: layouts,
});

export const calculatableValueChanged = (value, itemId) => ({
  type: ActionTypes.CALCULATABLE_VALUE_CHANGED,
  value: value,
  id: itemId,
});
