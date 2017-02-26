import Math from 'mathjs';
import ItemTypes from './../constants/item-types';

export const getNextDefaultItem = (type, action, numberOfCurrentItems) => {
  let ret = {
    id: action.id,
    type: type,
    itemName: action.itemName,
    text: action.text,
    value: action.value,
    formula: action.formula,
    isSelected: true,
    inputFirst: false,

    // settings
    bgcolor: '#ffffff',
    input_backgroundColor: '#ffffff',
    fontcolor: '#d4a24e',
    label_fontcolor: '#d4a24e',
    fontname: 'Arial',
    label_fontname: 'Arial',
    textAlign: 'left',
    textBold: false,
    textItalic: false,
    textUnderscore: false,


    // Transform
    w: 12,
    h: 2,
    x: 0,
    y: numberOfCurrentItems + 1,
  }

  return ret;
}

export const getDefaultStage = () => {
  let stageItem = getNextDefaultItem(ItemTypes.STAGE, {id: 0}, 0);
  stageItem = {
    ...stageItem,
    bgcolor: '#f2efe6',
    width: 600,
    height: 400,
  }

  return stageItem;
}

/**
* Creates a mapping of item names to item objects
* @param state - collection of items
*/
export const mapNamesToItems = (state) => {
  let nameToItemMapping = {};
  state.forEach(item => {
    nameToItemMapping[ item.itemName] = item;
  });
  return nameToItemMapping;
}

export const updateFormulaResults = (state, namesToItems) => {
  return state.map((item) => {
    if (item.type === ItemTypes.NUMBER_RESULT && item.formula) {
      // re-calculate result value based on formula
      let formula = item.formula;
      const operands = item.formula.split(/[\+\-\s]/);
      operands.forEach((name) => {
        if (typeof name === 'string' && name !== "" && isNaN(parseFloat(name, 10))) {
          if (namesToItems[ name]) {
            formula = formula.replace(name, namesToItems[ name].value);
          }
        }
      });
      try {
        //item.value = eval(formula);
        item.value = Math.eval(formula);
        console.log('new result item value is', item.value);
      } catch (err) {
        console.log('the formula is invalid');
        item.value = 0;
      }
    }
    return item;
  });
};
