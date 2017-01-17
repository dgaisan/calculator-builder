import React from 'react';
import ReactDOM from 'react-dom';
import ItemTypes from './../constants/item-types';
import { getNextDefaultItem, getDefaultStage, mapNamesToItems, updateFormulaResults } from './utils';

it('Populates proper next default item', () => {
  const type = 'Custom Next Type',
        action = {
          id: 1,
          itemName: 'Custom Item Name',
          text: 'Custom Text',
          value: 100,
          formula: 'X+Y'
        },
        numberOfCurrentItems = 1;
  const next = getNextDefaultItem(type, action, numberOfCurrentItems);

  expect(next.type).toBe(type);
  expect(next.id).toBe(action.id);
  expect(next.itemName).toBe(action.itemName);
  expect(next.text).toBe(action.text);
  expect(next.value).toBe(action.value);
  expect(next.formula).toBe(action.formula);
  expect(next.y).toBe(numberOfCurrentItems + 1);
  expect(typeof next.bgcolor).not.toBe('undefined');
  expect(next.bgcolor).not.toBe('');
  expect(typeof next.fontcolor).not.toBe('undefined');
  expect(next.fontcolor).not.toBe('');
  expect(typeof next.fontname).not.toBe('undefined');
  expect(next.fontname).not.toBe('');
});

it('Populates proper default Stage', () => {
  const stage = getDefaultStage();

  expect(stage.type).toBe(ItemTypes.STAGE);
  expect(stage.id).toBe(0);
  expect(typeof stage.bgcolor).not.toBe('undefined');
  expect(stage.bgcolor).not.toBe('');
  expect(typeof stage.width).toBe('number');
  expect(stage.width).not.toBe(0);
  expect(typeof stage.height).toBe('number');
  expect(stage.height).not.toBe(0);
});

it('Populates proper mapping of item names to item objects', () => {
  const action1 = {
    id: 1,
    itemName: 'Custom name 1',
    text: 'Custom static text1',
  };
  const action2 = {
    id: 2,
    itemName: 'Custom name 2',
    text: 'Custom static text1',
  };
  const action3 = {
    id: 3,
    itemName: 'Custom name 3',
    text: 'Custom static text1',
  };
  const item1 = getNextDefaultItem(ItemTypes.STATIC_TEXT, action1, 0);
  const item2 = getNextDefaultItem(ItemTypes.STATIC_TEXT, action2, 1);
  const item3 = getNextDefaultItem(ItemTypes.STATIC_TEXT, action3, 2);
  const state = [ item1, item2, item3];
  const result = mapNamesToItems(state),
        r1 = result[ action1.itemName],
        r2 = result[ action2.itemName],
        r3 = result[ action3.itemName];

  expect(typeof r1).not.toBe('undefined');
  expect(r1).toBe(item1);
  expect(r2).toBe(item2);
  expect(r3).toBe(item3);
  expect(result[ '__random']).not.toBe(item1);
});

it('Updates formula results', () => {
  const name1 = 'item1', name2 = 'item2', name3 = 'item3';
  const val1 = 11, val2 = 23;
  const action1 = {
    id: 1,
    type: 'My Action',
    itemName: name1,
    value: val1,
  };
  const action2 = {
    id: 2,
    type: 'My Action',
    itemName: name2,
    value: val2,
  };
  const action3 = {
    id: 3,
    type: 'My Action',
    itemName: name3,
    formula: 'item1 + item2',
  };
  const action4 = {
    id: 4,
    type: 'My Action',
    itemName: name3,
    formula: 'item2 + item1 * item2',
  };
  const item1 = getNextDefaultItem(ItemTypes.NUMBER_FIELD, action1, 0);
  const item2 = getNextDefaultItem(ItemTypes.NUMBER_FIELD, action2, 1);
  const item3 = getNextDefaultItem(ItemTypes.NUMBER_RESULT, action3, 2);
  const item4 = getNextDefaultItem(ItemTypes.NUMBER_RESULT, action4, 3);
  const state = [ item1, item2, item3, item4];

  const results = updateFormulaResults(state, mapNamesToItems(state));
  expect(results.find(item => (item.id === 3)).value).toBe(val1 + val2);
  expect(results.find(item => (item.id === 4)).value).toBe(val2 + val1 * val2);
});
