import { defaultStyles, defaultTitle } from '../src/constants';
import { storage } from '../src/core/utility';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  textTitle: defaultTitle,
  changeStyles: defaultStyles,
};

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState;
