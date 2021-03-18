import {
  APPLY_STYLES,
  CEIL_TEXT,
  CHANGE_STYLES,
  HEADER_TEXT,
  RESIZE_TABLE,
} from './types';

export function rootReducer(state, action) {
  let field;
  let val;
  switch (action.type) {
    case RESIZE_TABLE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      return { ...state, [field]: value(state, field, action.data) };
    case CEIL_TEXT:
      field = 'dataState';
      return {
        ...state,
        [field]: value(state, field, action.data),
      };
    case CHANGE_STYLES:
      return { ...state, changeStyles: action.data };
    case APPLY_STYLES:
      field = 'stylesState';
      val = state[field] || {};
      action.data.ids.forEach((id) => {
        val[id] = { ...val[id], ...action.data.value };
      });
      return {
        ...state,
        [field]: val,
        changeStyles: action.data.value,
      };
    case HEADER_TEXT:
      return { ...state, textTitle: action.data };
    default:
      return state;
  }
}

function value(state, field, action) {
  const val = state[field];

  val[action.id] = action.value;
  return val;
}
