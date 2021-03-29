import {
  APPLY_STYLES,
  CEIL_TEXT,
  CHANGE_STYLES,
  HEADER_TEXT,
  RESIZE_TABLE,
  UPDATE_DATE,
} from './types';

export function resizeTableCol(data) {
  return { type: RESIZE_TABLE, data };
}
export function ceilTextContent(data) {
  return { type: CEIL_TEXT, data };
}
export function changeStyles(data) {
  return { type: CHANGE_STYLES, data };
}
export function applyStyles(data) {
  return {
    type: APPLY_STYLES,
    data,
  };
}
export function changeHeaderTitle(data) {
  return { type: HEADER_TEXT, data };
}
export function updateDate() {
  return {
    type: UPDATE_DATE,
  };
}
