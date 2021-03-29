import { defaultStyles, defaultTitle } from '../src/constants';
import { copy } from '../src/core/utility';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  textTitle: defaultTitle,
  changeStyles: defaultStyles,
  openedDate: new Date().toJSON(),
};

export function initialState(state) {
  return state ? state : copy(defaultState);
}
