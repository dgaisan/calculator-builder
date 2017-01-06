import ItemTypes from './../constants/item-types';
import ActionTypes from './../constants/action-types';
import Math from 'mathjs';

const getNextDefaultItem = (type, action, numberOfCurrentItems) => {
  let ret = {
    id: action.id,
    type: type,
    itemName: action.itemName,
    text: action.text,
    value: action.value,
    formula: action.formula,
    isSelected: true,
    bgcolor: '#cecece',
    w: 12,
    h: 1,
    x: 0,
    y: numberOfCurrentItems + 1,
  }

  return ret;
}

const _nameToItemMapping = (state) => {
  let nameToItemMapping = {};
  state.forEach(item => {
    nameToItemMapping[ item.itemName] = item;
  });
  return nameToItemMapping;
}

const _updateResults = (state, namesToItems) => {
  console.log('_updateResults');
  console.log('namesToItems', namesToItems);
  return state.map((item) => {
    if (item.type === ItemTypes.NUMBER_RESULT && item.formula) {
      // re-calculate result value based on formula
      let formula = item.formula;
      const operands = item.formula.split(/[\+\-\s]/);
      console.log('operands', operands);
      operands.forEach((name) => {
        console.log('operand-name', name);
        if (typeof name === 'string' && name !== "" && Number.isNaN(parseFloat(name, 10))) {
          if (namesToItems[ name]) {
            formula = formula.replace(name, namesToItems[ name].value);
          }
        }
      });
      console.log('new formula', formula);
      try {
        //item.value = eval(formula);
        item.value = Math.eval(formula);
      } catch (err) {
        console.log('the formula is invalid');
        item.value = 0;
      }
    }
    return item;
  });
};

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
      return _updateResults(newState, _nameToItemMapping(newState));
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

        return _updateResults(ns, _nameToItemMapping(ns));
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
